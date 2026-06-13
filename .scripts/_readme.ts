import type { MetaEntry } from './_types'

const DATE_HYPHEN_RE = /-/g

/**
 * Calculate statistics from talks metadata
 */
export function calculateStatistics(meta: MetaEntry[]) {
  // Group talks by year
  const talksByYear = meta.reduce<Record<number, number>>((acc, metaEntry) => {
    const year = dateToYear(metaEntry.date)

    if (!acc[year]) {
      acc[year] = 0
    }
    acc[year]++
    return acc
  }, {})

  // Group talks by event
  const talksByEvent = meta.reduce<Record<string, { total: number, byYear: Record<number, number> }>>((acc, metaEntry) => {
    const year = dateToYear(metaEntry.date)

    if (!acc[metaEntry.event]) {
      acc[metaEntry.event] = { total: 0, byYear: {} }
    }
    acc[metaEntry.event].total++
    if (!acc[metaEntry.event].byYear[year]) {
      acc[metaEntry.event].byYear[year] = 0
    }
    acc[metaEntry.event].byYear[year]++
    return acc
  }, {})

  // Group talks by title to count repetitions
  const talksByTitle = meta.reduce<Record<string, { count: number, byYear: Record<number, number> }>>((acc, metaEntry) => {
    const year = dateToYear(metaEntry.date)

    if (!acc[metaEntry.name]) {
      acc[metaEntry.name] = { count: 0, byYear: {} }
    }
    acc[metaEntry.name].count++
    if (!acc[metaEntry.name].byYear[year]) {
      acc[metaEntry.name].byYear[year] = 0
    }
    acc[metaEntry.name].byYear[year]++
    return acc
  }, {})

  // Group talks with a recording by year
  const talksWithRecordingByYear = meta.reduce<Record<number, number>>((acc, metaEntry) => {
    if (!metaEntry.recording_url) {
      return acc
    }

    const year = dateToYear(metaEntry.date)

    if (!acc[year]) {
      acc[year] = 0
    }

    acc[year]++
    return acc
  }, {})

  // Group talks by city
  const talksByCity = meta.reduce<Record<string, { total: number, byYear: Record<number, number> }>>((acc, metaEntry) => {
    const year = dateToYear(metaEntry.date)
    const city = metaEntry.location.city

    if (!acc[city]) {
      acc[city] = { total: 0, byYear: {} }
    }

    acc[city].total++

    if (!acc[city].byYear[year]) {
      acc[city].byYear[year] = 0
    }

    acc[city].byYear[year]++
    return acc
  }, {})

  const years = Object.keys(talksByYear).map(Number).sort((a, b) => b - a)
  const totalTalksWithRecording = meta.filter(metaEntry => Boolean(metaEntry.recording_url)).length

  return {
    talksByYear,
    talksByEvent,
    talksByTitle,
    talksWithRecordingByYear,
    talksByCity,
    years,
    totalTalks: meta.length,
    totalTalksWithRecording,
  }
}

/**
 * Generate README content from talks metadata
 */
export function generateReadmeContent(meta: MetaEntry[]): string {
  const stats = calculateStatistics(meta)

  const { talksByYear, talksByEvent, talksByTitle, talksWithRecordingByYear, talksByCity, years, totalTalks, totalTalksWithRecording } = stats

  // Group talks for listing
  const talksGroupedByYear = meta.reduce<Record<number, MetaEntry[]>>((acc, metaEntry) => {
    const year = dateToYear(metaEntry.date)

    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(metaEntry)
    return acc
  }, {})

  // Sort talks by date descending within each year
  for (const year of years) {
    talksGroupedByYear[year].sort((a, b) => -a.date.localeCompare(b.date))
  }

  // Build README content
  let content = `# Talks

Slides from my [talks](https://soubiran.dev/talks).

## Talks\n\n`

  // Add talks list
  for (const year of years) {
    content += `### ${year}\n\n`

    for (const talk of talksGroupedByYear[year]) {
      // Format: - `lang` [Title](./folder) - Event
      const lang = talk.language || 'en'
      content += `- \`${lang}\` [${talk.name}](./${talk.folder}) - ${talk.event}\n`
    }

    content += '\n'
  }

  // Add details section with simple text format
  content += `<details>\n<summary>Copy talks list as text</summary>\n\n\`\`\`\n`

  // Add talks in simple text format
  for (const year of years) {
    for (const talk of talksGroupedByYear[year]) {
      // Format: Date - Title - Event - Location
      const location = `${talk.location.city}, ${talk.location.country}`
      content += `${talk.date} - ${talk.name} - ${talk.event} - ${location}\n`
    }
  }

  content += `\`\`\`\n\n</details>\n\n`

  content += `## Statistics

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

  content += `\n### Talks with Recording

| Year | With Recording | Without Recording | Coverage |
|------|----------------|-------------------|----------|
`

  for (const year of years) {
    const withRecording = talksWithRecordingByYear[year] || 0
    const totalForYear = talksByYear[year]
    const withoutRecording = totalForYear - withRecording
    const coverage = formatPercent(withRecording, totalForYear)

    content += `| ${year} | ${withRecording} | ${withoutRecording} | ${coverage} |\n`
  }

  content += `| **Total** | **${totalTalksWithRecording}** | **${totalTalks - totalTalksWithRecording}** | **${formatPercent(totalTalksWithRecording, totalTalks)}** |\n\n`

  content += `### Talks per City

| City | Total | ${years.join(' | ')} |
|------|-------|${years.map(() => '------').join('|')}|
`

  const cityEntries = Object.entries(talksByCity).sort((a, b) => a[0].localeCompare(b[0]))

  for (const [city, data] of cityEntries) {
    const yearCounts = years.map(year => data.byYear[year] || 0).join(' | ')
    content += `| ${city} | ${data.total} | ${yearCounts} |\n`
  }

  // Add footer with copy assets command
  content += `\n---

Copy assets to S3 bucket:

\`\`\`sh
rclone copy . perso:talks-soubiran-dev --filter-from ./copy-assets.txt
\`\`\`
`

  return content
}

/**
 * Generate README content for a single talk
 */
export function generateTalkReadmeContent(meta: MetaEntry): string {
  const content = `# ${meta.name}

${meta.date.replace(DATE_HYPHEN_RE, '/')} - [${meta.event}](${meta.event_url})
`
  return content
}

function dateToYear(dateStr: string): number {
  return Number(dateStr.slice(0, 4))
}

function formatPercent(value: number, total: number): string {
  if (total === 0) {
    return '0%'
  }

  return `${Math.round((value / total) * 100)}%`
}
