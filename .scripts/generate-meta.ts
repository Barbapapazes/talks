import type { MetaEntry } from './_types.ts'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { talkMetadataSchema, talkResourceMetadataSchema, talksStatisticsDataSchema } from '@soubiran/talks'
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
  const standaloneTalks = talks.filter(talk => talk.meta.publication !== 'article-resource')
  const resources = talks.filter(talk => talk.meta.publication === 'article-resource')
  const meta = standaloneTalks.map(talk => talk.meta)
  assertUniqueTalks(meta)

  const statistics = calculateStatistics(meta)
  const serializedStatistics = serializeStatistics(statistics)

  mkdirSync('dist', { recursive: true })

  writeJson('meta.json', { data: meta, statistics: serializedStatistics })
  writeJson('statistics.json', serializedStatistics)

  for (const talk of talks) {
    for (const [locale, metadata] of Object.entries(talk.localizedMetadata)) {
      writeTalkMetadata(talk.meta.prefix, locale, metadata, talk.meta.publication === 'article-resource')
    }
  }

  for (const locale of ['en', 'fr'] as const) {
    writeJson(`talks.${locale}.json`, standaloneTalks.map(talk => talkMetadataSchema.parse(talk.localizedMetadata[locale])))
    writeJson(`resources.${locale}.json`, resources.map(talk => talkResourceMetadataSchema.parse(talk.localizedMetadata[locale])))
  }
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
  return talksStatisticsDataSchema.parse({
    totalTalks: statistics.totalTalks,
    totalTalksWithRecording: statistics.totalTalksWithRecording,
    talksByYear: statistics.talksByYear,
    talksByEvent: statistics.talksByEvent,
    talksByTitle: statistics.talksByTitle,
    talksWithRecordingByYear: statistics.talksWithRecordingByYear,
    talksByCity: statistics.talksByCity,
  })
}

function writeJson(fileName: string, data: unknown) {
  const content = JSON.stringify(data)

  writeFileSync(join('dist', fileName), content)
}

function writeTalkMetadata(slug: string, locale: string, metadata: unknown, resource: boolean) {
  const outputDir = join('dist', slug)
  const schema = resource ? talkResourceMetadataSchema : talkMetadataSchema
  const content = JSON.stringify(schema.parse(metadata), null, 2)

  mkdirSync(outputDir, { recursive: true })
  writeFileSync(join(outputDir, `meta.${locale}.json`), `${content}\n`)
}

generateMeta()
