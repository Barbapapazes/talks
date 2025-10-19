import type { Package } from './_types.ts'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'pathe'
import { getPackagesJson } from './_utils.ts'

function generateMeta() {
  const packagesJson = getPackagesJson()

  const meta = [] as {
    name: string
    date: string
    event: string
    url: string
    pdf_url: string
    thumbnail_url: string
    github_url?: string
    recording_url?: string
    audio_url?: string
    transcript?: string
  }[]

  for (const packageJSON of packagesJson) {
    const date = packageJSON.split('/')[0]

    const content = JSON.parse(readFileSync(packageJSON, 'utf-8')) as Package
    const event = content.event
    const url = `https://talks.soubiran.dev/${date}/${content.name}`
    const thumbnail_url = `${url}/thumbnail.png`
    const pdf_url = `${url}/pdf`
    const github_url = `${url}/src`
    const recording_url = `${url}/recording`
    const audio_url = `${url}/audio`
    const transcript = `${url}/transcript`

    const path = packageJSON.split('/').slice(0, -1).join('/')
    const slidesContent = readFileSync(join(path, 'slides.md'), 'utf-8')

    const name = slidesContent.match(/title: (.*)/)?.[1].replaceAll(/"/g, '').trim()

    if (!name) {
      throw new Error('Name not found')
    }

    meta.push({
      name,
      event,
      date,
      url,
      thumbnail_url,
      pdf_url,
      github_url,
      recording_url: content.recording ? recording_url : undefined,
      audio_url: content.recording ? audio_url : undefined,
      transcript: content.recording ? transcript : undefined,
    })
  }

  writeFileSync(join('dist', 'meta.json'), JSON.stringify({ data: meta }))
}

generateMeta()
