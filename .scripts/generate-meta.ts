import type { MetaEntry } from './_types.ts'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'pathe'
import { generateMetaEntry } from './_meta.ts'
import { calculateStatistics } from './_readme.ts'
import { getPackagesJson } from './_utils.ts'

async function generateMeta() {
  const packagesJson = getPackagesJson()

  const metaPromises = [] as Promise<MetaEntry>[]
  for (const packageJSON of packagesJson) {
    metaPromises.push(generateMetaEntry(packageJSON.split('/')[0]))
  }
  const meta = await Promise.all(metaPromises)

  // Check for duplicate talks (same name and event)
  const uniqueTalks = new Set<string>()
  for (const entry of meta) {
    const identifier = `${entry.name}-${entry.event}`
    if (uniqueTalks.has(identifier)) {
      throw new Error(`Duplicate talk found: ${entry.name} at ${entry.event}`)
    }
    uniqueTalks.add(identifier)
  }

  const statistics = calculateStatistics(meta)

  // Ensure dist directory exists
  mkdirSync('dist', { recursive: true })

  writeFileSync(join('dist', 'meta.json'), JSON.stringify({
    data: meta,
    statistics: {
      totalTalks: statistics.totalTalks,
      talksByYear: statistics.talksByYear,
      talksByEvent: Object.fromEntries(
        Object.entries(statistics.talksByEvent).map(([event, data]) => [event, {
          total: data.total,
          byYear: data.byYear,
        }]),
      ),
      talksByTitle: Object.fromEntries(
        Object.entries(statistics.talksByTitle).map(([title, data]) => [title, {
          count: data.count,
          byYear: data.byYear,
        }]),
      ),
    },
  }))
}

generateMeta()
