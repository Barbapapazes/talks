import type { Package } from './_types.ts'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'

interface TalkMetadata extends Package {
  folder: string
  title: string
  language?: string
  year: number
}

/**
 * Extract language code from lang attribute (e.g., "fr-FR" -> "fr", "en" -> "en")
 */
function extractLanguageCode(lang: string): string {
  // Handle common formats like "fr-FR", "en-US", etc.
  const langCode = lang.split('-')[0].toLowerCase()
  return langCode
}

/**
 * Read and parse slides.md frontmatter to extract language
 */
async function extractLanguageFromSlides(slidesPath: string): Promise<string | undefined> {
  try {
    const content = await readFile(slidesPath, 'utf-8')
    const { data } = matter(content)

    // Look for lang in htmlAttrs or at root level
    const lang = data.htmlAttrs?.lang || data.lang
    if (lang) {
      return extractLanguageCode(lang)
    }

    return undefined
  }
  catch (error) {
    console.warn(`Could not read slides.md at ${slidesPath}:`, error)
    return undefined
  }
}

/**
 * Extract metadata from a talk folder
 */
async function extractTalkMetadata(folder: string): Promise<TalkMetadata | null> {
  try {
    const readmePath = resolve(folder, 'README.md')
    const packageJsonPath = resolve(folder, 'src', 'package.json')
    const slidesPath = resolve(folder, 'src', 'slides.md')

    // Read README.md for title
    const readmeContent = await readFile(readmePath, 'utf-8')
    const titleMatch = readmeContent.match(/^# (.*)$/m)
    const title = titleMatch?.[1]?.trim() || 'Untitled'

    // Read package.json for event, recording, article
    const packageJsonContent = await readFile(packageJsonPath, 'utf-8')
    const packageJson = JSON.parse(packageJsonContent) as Package

    // Extract language from slides.md
    const language = await extractLanguageFromSlides(slidesPath)

    // Extract date from folder name (e.g., "2024-04-19" or "2025-11-07-1")
    const folderName = folder.split('/').pop() || ''
    const dateMatch = folderName.match(/^(\d{4})-(\d{2})-(\d{2})/)

    if (!dateMatch) {
      console.warn(`Could not extract date from folder: ${folderName}`)
      return null
    }

    const year = Number.parseInt(dateMatch[1])
    const date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`

    return {
      folder: folderName,
      title,
      date,
      name: packageJson.name,
      event: packageJson.event,
      description: packageJson.description,
      recording: packageJson.recording,
      article: packageJson.article,
      language,
      year,
    }
  }
  catch (error) {
    console.warn(`Could not extract metadata from ${folder}:`, error)
    return null
  }
}

/**
 * Generate README content from talks metadata
 */
function generateReadmeContent(talks: TalkMetadata[]): string {
  // Group talks by year
  const talksByYear = talks.reduce<Record<number, TalkMetadata[]>>((acc, talk) => {
    if (!acc[talk.year]) {
      acc[talk.year] = []
    }
    acc[talk.year].push(talk)
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

  // Sort years in descending order
  const years = Object.keys(talksByYear)
    .map(Number)
    .sort((a, b) => b - a)

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
    content += `| ${year} | ${talksByYear[year].length} |\n`
  }

  content += `| **Total** | **${talks.length}** |\n\n`

  // Add talks by event statistics
  content += `### Talks per Event

| Event | Total | ${years.join(' | ')} |
|-------|-------|${years.map(() => '------').join('|')}|
`

  // Sort events by total number of talks (descending)
  const eventEntries = Object.entries(talksByEvent).sort((a, b) => b[1].total - a[1].total)

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

  // Sort talks by count (descending)
  const titleEntries = Object.entries(talksByTitle).sort((a, b) => b[1].count - a[1].count)

  for (const [title, data] of titleEntries) {
    const yearCounts = years.map(year => data.byYear[year] || 0).join(' | ')
    content += `| ${title} | ${data.count} | ${yearCounts} |\n`
  }

  content += '\n## Talks\n\n'

  // Add talks list
  for (const year of years) {
    content += `### ${year}\n\n`

    // Sort talks by date descending within year
    const yearTalks = talksByYear[year].sort((a, b) => -a.date.localeCompare(b.date))

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
 * Get all talk folders matching date pattern
 * Reuses the same logic as selectDeck from _utils.ts
 */
async function getTalkFolders(_rootPath: string): Promise<string[]> {
  // Reuse the logic from selectDeck to get folders
  const url = new URL('..', import.meta.url)
  const { readdir } = await import('node:fs/promises')

  const folders = (await readdir(url, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder.match(/^\d{4}-\d{2}-\d{2}/))
    .sort((a, b) => -a.localeCompare(b))

  return folders
}

/**
 * Main function to generate README
 */
export async function generateReadme(rootPath = '.'): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('Scanning talk folders...')

  // Get all folders matching date pattern (YYYY-MM-DD or YYYY-MM-DD-N)
  const folders = await getTalkFolders(rootPath)

  // eslint-disable-next-line no-console
  console.log(`Found ${folders.length} talk folders`)

  // Extract metadata from each folder concurrently
  const talks: TalkMetadata[] = []
  const metadataPromises = folders.map(async (folder) => {
    const folderPath = resolve(rootPath, folder)
    const metadata = await extractTalkMetadata(folderPath)
    if (metadata) {
      // If language is missing, throw an error
      if (!metadata.language) {
        throw new Error(`Language missing for ${folder}. Please add 'lang' to the slides.md frontmatter.`)
      }
    }
    return metadata
  })

  const results = await Promise.allSettled(metadataPromises)
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      talks.push(result.value)
    }
    else if (result.status === 'rejected') {
      console.error(result.reason)
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Extracted metadata from ${talks.length} talks`)

  // Generate README content
  const readmeContent = generateReadmeContent(talks)

  // Write README.md
  const readmePath = resolve(rootPath, 'README.md')
  await writeFile(readmePath, readmeContent, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('README.md updated successfully!')
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateReadme()
}
