import type { MetaEntry, TalkCatalogEntry, TalksCatalog } from './_types.ts'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'pathe'
import { generateMetaEntry } from './_meta.ts'
import { calculateStatistics } from './_readme.ts'
import { getPackagesJson } from './_utils.ts'

async function generateMeta() {
  const meta = await loadMetaEntries()
  assertUniqueTalks(meta)

  const statistics = serializeStatistics(calculateStatistics(meta))
  const talks = createTalksCatalog(meta)

  mkdirSync('dist', { recursive: true })

  writeJson('meta.json', { data: meta, statistics })
  writeJson('talks.json', talks)
}

function loadMetaEntries(): Promise<MetaEntry[]> {
  return Promise.all(
    getPackagesJson().map(packageJsonPath => generateMetaEntry(packageJsonPath.split('/')[0])),
  )
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

function createTalksCatalog(entries: MetaEntry[]): TalksCatalog {
  return {
    data: entries.map(toTalkCatalogEntry),
  }
}

function writeJson(fileName: string, data: unknown) {
  const content = JSON.stringify(data)

  writeFileSync(join('dist', fileName), content)
}

function toTalkCatalogEntry(entry: MetaEntry): TalkCatalogEntry {
  return {
    id: entry.prefix,
    title: entry.name,
    description: entry.description,
    date: entry.date,
    presentationLanguage: entry.language,
    topics: entry.topics,
    event: {
      name: entry.event,
      url: entry.event_url,
      location: {
        city: entry.location.city,
        country: entry.location.country,
      },
    },
    links: {
      slides: entry.url,
      source: entry.github_url ?? entry.url,
      pdf: entry.pdf_url,
      recording: entry.recording_url,
      audio: entry.audio_url,
      transcript: entry.transcript_url,
      article: entry.article_url,
    },
  }
}

generateMeta()
