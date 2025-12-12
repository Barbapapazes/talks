import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

interface MetaEntry {
  name: string
  date: string
  prefix: string
  event: string
  description?: string
  url: string
  pdf_url: string
  thumbnail_url: string
  github_url?: string
  recording_url?: string
  audio_url?: string
  transcript_url?: string
  article_url?: string
}

interface TalkMetadata {
  folder: string
  title: string
  event: string
  date: string
  year: number
  language?: string
}

/**
 * Convert meta entries to talk metadata for README generation
 */
export function convertMetaToTalks(metaEntries: MetaEntry[]): TalkMetadata[] {
  return metaEntries.map((entry) => {
    const folder = entry.prefix.split('/')[0]
    const year = Number.parseInt(entry.date.split('-')[0])

    return {
      folder,
      title: entry.name,
      event: entry.event,
      date: entry.date,
      year,
      language: undefined, // Will be populated from slides if needed
    }
  })
}

/**
 * Calculate statistics from talks metadata
 */
export function calculateStatistics(talks: TalkMetadata[]) {
  // Group talks by year
  const talksByYear = talks.reduce<Record<number, number>>((acc, talk) => {
    if (!acc[talk.year]) {
      acc[talk.year] = 0
    }
    acc[talk.year]++
    return acc
  }, {})

  // Group talks by event
  const talksByEvent = talks.reduce<Record<string, { total: number, byYear: Record<number, number> }>>((acc, talk) => {
    if (!acc[talk.event]) {
      acc[talk.event] = { total: 0, byYear: {} }
    }
    acc[talk.event].total++
    if (!acc[talk.event].byYear[talk.year]) {
      acc[talk.event].byYear[talk.year] = 0
    }
    acc[talk.event].byYear[talk.year]++
    return acc
  }, {})

  // Group talks by title to count repetitions
  const talksByTitle = talks.reduce<Record<string, { count: number, byYear: Record<number, number> }>>((acc, talk) => {
    if (!acc[talk.title]) {
      acc[talk.title] = { count: 0, byYear: {} }
    }
    acc[talk.title].count++
    if (!acc[talk.title].byYear[talk.year]) {
      acc[talk.title].byYear[talk.year] = 0
    }
    acc[talk.title].byYear[talk.year]++
    return acc
  }, {})

  const years = Object.keys(talksByYear).map(Number).sort((a, b) => b - a)

  return {
    talksByYear,
    talksByEvent,
    talksByTitle,
    years,
    totalTalks: talks.length,
  }
}

/**
 * Generate README content from talks metadata
 */
function generateReadmeContent(talks: TalkMetadata[]): string {
  const stats = calculateStatistics(talks)
  const { talksByYear, talksByEvent, talksByTitle, years, totalTalks } = stats

  // Group talks for listing
  const talksGroupedByYear = talks.reduce<Record<number, TalkMetadata[]>>((acc, talk) => {
    if (!acc[talk.year]) {
      acc[talk.year] = []
    }
    acc[talk.year].push(talk)
    return acc
  }, {})

  // Build README content
  let content = `# Talks

Slides from my [talks](https://soubiran.dev/talks).

## Statistics

### Talks per Year

| Year | Number of Talks |
|------|-----------------|
`

  // Add talks per year statistics
  for (const year of years) {
    content += `| ${year} | ${talksByYear[year]} |\n`
  }

  content += `| **Total** | **${totalTalks}** |\n\n`

  // Add talks by event statistics
  content += `### Talks per Event

| Event | Total | ${years.join(' | ')} |
|-------|-------|${years.map(() => '------').join('|')}|
`

  // Sort events alphabetically
  const eventEntries = Object.entries(talksByEvent).sort((a, b) => a[0].localeCompare(b[0]))

  for (const [event, data] of eventEntries) {
    const yearCounts = years.map(year => data.byYear[year] || 0).join(' | ')
    content += `| ${event} | ${data.total} | ${yearCounts} |\n`
  }

  content += '\n'

  // Add talks by title statistics
  content += `### Talks by Title

| Talk Title | Total | ${years.join(' | ')} |
|------------|-------|${years.map(() => '------').join('|')}|
`

  // Sort talks alphabetically
  const titleEntries = Object.entries(talksByTitle).sort((a, b) => a[0].localeCompare(b[0]))

  for (const [title, data] of titleEntries) {
    const yearCounts = years.map(year => data.byYear[year] || 0).join(' | ')
    content += `| ${title} | ${data.count} | ${yearCounts} |\n`
  }

  content += '\n## Talks\n\n'

  // Add talks list
  for (const year of years) {
    content += `### ${year}\n\n`

    // Sort talks by date descending within year
    const yearTalks = talksGroupedByYear[year].sort((a, b) => -a.date.localeCompare(b.date))

    for (const talk of yearTalks) {
      // Format: - `lang` [Title](./folder) - Event
      const lang = talk.language || 'en'
      content += `- \`${lang}\` [${talk.title}](./${talk.folder}) - ${talk.event}\n`
    }

    content += '\n'
  }

  // Add footer with copy assets command
  content += `---

Copy assets to S3 bucket:

\`\`\`sh
rclone copy . perso:talks-soubiran-dev --filter-from ./copy-assets.txt
\`\`\`
`

  return content
}

/**
 * Generate README from meta entries
 */
export async function generateReadme(metaEntries: MetaEntry[], rootPath = '.'): Promise<void> {
  // Convert meta entries to talk metadata
  const talks = convertMetaToTalks(metaEntries)

  // Read language from slides.md for each talk
  for (const talk of talks) {
    const slidesPath = resolve(rootPath, talk.folder, 'src', 'slides.md')
    try {
      const content = await readFile(slidesPath, 'utf-8')
      const matter = await import('gray-matter')
      const { data } = matter.default(content)

      const lang = data.htmlAttrs?.lang || data.lang
      if (lang) {
        talk.language = lang.split('-')[0].toLowerCase()
      }
    }
    catch {
      // Default to 'fr' if we can't read the language
      talk.language = 'fr'
    }
  }

  // Generate README content
  const readmeContent = generateReadmeContent(talks)

  // Write README.md
  const readmePath = resolve(rootPath, 'README.md')
  await writeFile(readmePath, readmeContent, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('README.md updated successfully!')
}
