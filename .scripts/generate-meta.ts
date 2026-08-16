import type { MetaEntry } from './_types.ts'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'pathe'
import { createTalksCatalog, generateTalkEntries } from './_meta.ts'
import { calculateStatistics } from './_readme.ts'
import { getPackagesJson } from './_utils.ts'

async function generateMeta() {
  const packagesJson = getPackagesJson()
  const talks = await Promise.all(packagesJson.map(packageJson => generateTalkEntries(packageJson.split('/')[0])))
  const meta = talks.map(talk => talk.meta)
  assertUniqueTalks(meta)

  const statistics = calculateStatistics(meta)

  mkdirSync('dist', { recursive: true })

  writeJson('meta.json', { data: meta, statistics: serializeStatistics(statistics) })
  writeJson('talks.json', createTalksCatalog(talks.map(talk => talk.catalog)))
}

function assertUniqueTalks(entries: MetaEntry[]) {
  const uniqueTalks = new Set<string>()

  for (const entry of entries) {
    const identifier = `${entry.name}-${entry.event}`
    if (uniqueTalks.has(identifier)) {
      throw new Error(`Duplicate talk found: ${entry.name} at ${entry.event}`)
    }

    uniqueTalks.add(identifier)
  }
}

function serializeStatistics(statistics: ReturnType<typeof calculateStatistics>) {
  return {
    totalTalks: statistics.totalTalks,
    totalTalksWithRecording: statistics.totalTalksWithRecording,
    talksByYear: statistics.talksByYear,
    talksByEvent: statistics.talksByEvent,
    talksByTitle: statistics.talksByTitle,
    talksWithRecordingByYear: statistics.talksWithRecordingByYear,
    talksByCity: statistics.talksByCity,
  }
}

function writeJson(fileName: string, data: unknown) {
  const content = JSON.stringify(data)

  writeFileSync(join('dist', fileName), content)
}

generateMeta()
