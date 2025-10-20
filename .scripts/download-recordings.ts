import type { Package } from './_types.ts'
import { exec as _exec } from 'node:child_process'
import { createReadStream, existsSync, mkdirSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import OpenAI from 'openai'
import { getPackagesJson } from './_utils.ts'
import 'dotenv/config'

const exec = promisify(_exec)

const openai = new OpenAI()

async function downloadRecordings() {
  const packagesJson = getPackagesJson()

  await Promise.allSettled(packagesJson.map(packageJson => downloadAudio(packageJson)))
}

downloadRecordings()

async function downloadAudio(packageJson: string) {
  const content = await readFile(packageJson, 'utf-8')
  const parsedContent = JSON.parse(content) as Package

  if (!parsedContent.recording) {
    return
  }

  const date = packageJson
    .split('/')
    .slice(0, 1)
    .join('/')
  const folder = `./${date}`
  const tmpFolder = `${folder}/.tmp`

  mkdirSync(tmpFolder, { recursive: true })

  const fileName = `${date}-${parsedContent.name}`

  const downloadedFileName = `${tmpFolder}/${fileName}.downloaded.mp3`
  if (!existsSync(downloadedFileName)) {
    // eslint-disable-next-line no-console
    console.log(`Downloading audio for ${parsedContent.name}...`)
    await exec(`yt-dlp -x --audio-format mp3 -o "${downloadedFileName}" ${parsedContent.recording}`)
  }

  const normalizedFileName = `${folder}/${fileName}.mp3`
  if (!existsSync(normalizedFileName)) {
    // eslint-disable-next-line no-console
    console.log(`Normalizing audio for ${parsedContent.name}...`)
    await exec(`ffmpeg -i "${downloadedFileName}" -af "loudnorm" "${normalizedFileName}"`)
  }

  const compressedFileName = `${tmpFolder}/${fileName}.compressed.mp3`
  if (!existsSync(compressedFileName)) {
    // eslint-disable-next-line no-console
    console.log(`Compressing audio for ${parsedContent.name} by reducing sample rate...`)
    // aggressively compress: reduce sample rate to 16 kHz, force mono and set low bitrate (64k)
    await exec(
      `ffmpeg -i "${normalizedFileName}" -ar 16000 -ac 1 -codec:a libmp3lame -b:a 64k "${compressedFileName}"`,
    )
  }

  const transcriptionFileName = `${folder}/src/public/transcript.md`
  // ensure directory exists before writing transcription
  try {
    await writeFile(transcriptionFileName, '', { flag: 'a' })
  }
  catch {
    // ignore; we'll create file later when writing
  }

  // If transcript already exists and is non-empty, skip transcription
  const statExists = existsSync(transcriptionFileName) && (await readFile(transcriptionFileName, 'utf-8')).trim().length > 0
  if (!statExists) {
    // eslint-disable-next-line no-console
    console.log(`Transcribing audio for ${parsedContent.name} in chunks...`)

    // We'll split into ~10 minute chunks (600 seconds). Prefer silence near cut points using ffmpeg's silencedetect.
    // Strategy:
    // 1. Use ffmpeg to split by fixed 10m segments as fallback.
    // 2. Try to find nearby silence using ffmpeg's silence detect and adjust cut time +/- up to 10s.

    const chunkDuration = 600 // seconds (10 minutes)
    const maxSilenceSearch = 30 // seconds to search before/after cut for silence

    // Get duration of file in seconds
    const { stdout: ffprobeOut } = await exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${compressedFileName}"`)
    const totalDuration = Math.max(0, Math.floor(Number(ffprobeOut.trim()) || 0))

    // compute chunk boundaries (start times)
    const chunkStarts: number[] = []
    for (let t = 0; t < totalDuration; t += chunkDuration) {
      chunkStarts.push(t)
    }

    // helper to format seconds to HH:MM:SS

    // For each chunk, try to detect a silence near the intended end and cut there
    const chunkFiles: string[] = []

    for (let i = 0; i < chunkStarts.length; i++) {
      const start = chunkStarts[i]
      const intendedEnd = Math.min(start + chunkDuration, totalDuration)

      // Search window for a silence: from (intendedEnd - maxSilenceSearch) to (intendedEnd + maxSilenceSearch)
      const windowStart = Math.max(start, intendedEnd - maxSilenceSearch)
      const windowDuration = Math.min(totalDuration - windowStart, maxSilenceSearch * 2)

      let cutAt = intendedEnd // default

      try {
        // Run silencedetect on the window to find silence_end positions
        // Create a temporary small file for the window
        const windowFile = `${tmpFolder}/${fileName}.window.${i}.wav`
        await exec(`ffmpeg -y -ss ${formatSecondsToHuman(windowStart)} -t ${windowDuration} -i "${compressedFileName}" -ac 1 -ar 16000 -c:a pcm_s16le "${windowFile}"`)

        const { stdout: sdOut, stderr: sdErr } = await exec(`ffmpeg -i "${windowFile}" -af silencedetect=noise=-30dB:d=0.3 -f null - 2>&1 | grep silencedetect || true`)
        const sd = (sdOut + sdErr).toString()

        // parse silence_end lines and pick last silence_end (closest to window end)
        const silenceEnds: number[] = []
        const re = /silence_end: (\d+\.?\d*)/g
        let m
        // eslint-disable-next-line no-cond-assign
        while ((m = re.exec(sd))) {
          silenceEnds.push(Number(m[1]))
        }

        if (silenceEnds.length > 0) {
          // silenceEnd is relative to window file start; convert to absolute seconds
          const relative = silenceEnds[silenceEnds.length - 1]
          const absolute = windowStart + Math.floor(relative)
          // Only accept silence if it's within +/- maxSilenceSearch of intendedEnd
          if (Math.abs(absolute - intendedEnd) <= maxSilenceSearch) {
            cutAt = Math.min(absolute, totalDuration)
          }
        }

        // cleanup window file
        await exec(`rm -f "${windowFile}"`)
      }
      catch {
        // ignore silencedetect errors and fall back to fixed chunk end
      }

      // Calculate actual duration for this chunk
      const actualDuration = Math.max(1, cutAt - start)
      const chunkFile = `${tmpFolder}/${fileName}.part${String(i).padStart(3, '0')}.mp3`
      chunkFiles.push(chunkFile)

      if (!existsSync(chunkFile)) {
        // create chunk
        await exec(`ffmpeg -y -ss ${formatSecondsToHuman(start)} -t ${actualDuration} -i "${compressedFileName}" -ar 16000 -ac 1 -codec:a libmp3lame -b:a 64k "${chunkFile}"`)
      }
    }

    // sequentially send chunks to OpenAI and append responses
    for (let i = 0; i < chunkFiles.length; i++) {
      const chunkFile = chunkFiles[i]
      // eslint-disable-next-line no-console
      console.log(`Transcribing chunk ${i + 1}/${chunkFiles.length} -> ${chunkFile}`)

      const transcription = await openai.audio.transcriptions.create({
        file: createReadStream(chunkFile),
        chunking_strategy: 'auto',
        model: 'gpt-4o-transcribe',
      })

      // append only transcription text so final transcript is a single continuous file
      await writeFile(transcriptionFileName, `${transcription.text}\n`, { flag: 'a' })
    }
  }
}

function formatSecondsToHuman(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}
