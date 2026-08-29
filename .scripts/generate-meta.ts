import type { LocalizedTalkCatalog } from '@soubiran/talks'
import type { MetaEntry } from './_types.ts'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { join } from 'pathe'
import { generateTalkEntriesFromPackage } from './_meta.ts'
import { calculateStatistics } from './_readme.ts'
import { getPackagesJson } from './_utils.ts'
import { validateTalkArtifacts, validateTalkPackages } from './_validation.ts'

async function generateMeta() {
  const packagesJson = getPackagesJson()
  const sources = validateTalkPackages(packagesJson.map(packageFile => ({
    dir: dirname(dirname(packageFile)),
    packageJson: JSON.parse(readFileSync(packageFile, 'utf-8')),
  })))
  await Promise.all(sources.map(source => validateTalkArtifacts(source.dir, source.packageJson)))
  const talks = sources.map(source => generateTalkEntriesFromPackage(source.dir, source.packageJson))
  const meta = talks.map(talk => talk.meta)
  assertUniqueTalks(meta)

  const statistics = calculateStatistics(meta)
  const serializedStatistics = serializeStatistics(statistics)

  mkdirSync('dist', { recursive: true })

  writeJson('meta.json', { data: meta, statistics: serializedStatistics })
  writeJson('statistics.json', serializedStatistics)

  for (const talk of talks) {
    for (const [locale, metadata] of Object.entries(talk.localizedMetadata)) {
      writeTalkMetadata(talk.meta.prefix, locale, metadata)
    }
  }

  const englishTalks: LocalizedTalkCatalog<'en'> = talks.map(talk => talk.localizedMetadata.en)
  const frenchTalks: LocalizedTalkCatalog<'fr'> = talks.map(talk => talk.localizedMetadata.fr)

  writeJson('talks.en.json', englishTalks)
  writeJson('talks.fr.json', frenchTalks)
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

function writeTalkMetadata(slug: string, locale: string, metadata: unknown) {
  const outputDir = join('dist', slug)

  mkdirSync(outputDir, { recursive: true })
  writeFileSync(join(outputDir, `meta.${locale}.json`), `${JSON.stringify(metadata, null, 2)}\n`)
}

generateMeta()
