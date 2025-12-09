import type { Package } from './_types.ts'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

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

    // Extract frontmatter (between --- markers)
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch)
      return undefined

    const frontmatter = frontmatterMatch[1]

    // Look for lang: in htmlAttrs or at root level
    const langMatch = frontmatter.match(/lang:\s*([a-z]{2}(?:-[A-Z]{2})?)/i)
    if (langMatch) {
      return extractLanguageCode(langMatch[1])
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
 * Update slides.md with language if missing
 */
async function updateSlidesWithLanguage(slidesPath: string, language: string): Promise<void> {
  try {
    const content = await readFile(slidesPath, 'utf-8')

    // Check if language already exists
    if (content.match(/lang:\s*[a-z]{2}/i)) {
      return // Language already set
    }

    // Check if there's a frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) {
      // No frontmatter, add one with language
      const newContent = `---
htmlAttrs:
  lang: ${language}
  dir: ltr
---
${content}`
      await writeFile(slidesPath, newContent, 'utf-8')
      // eslint-disable-next-line no-console
      console.log(`Added language ${language} to ${slidesPath}`)
      return
    }

    // Frontmatter exists, check if htmlAttrs exists
    const frontmatter = frontmatterMatch[1]
    if (frontmatter.includes('htmlAttrs:')) {
      // htmlAttrs exists, add lang if not present
      const updatedFrontmatter = frontmatter.replace(
        /htmlAttrs:/,
        `htmlAttrs:\n  lang: ${language}`,
      )
      const newContent = content.replace(frontmatterMatch[1], updatedFrontmatter)
      await writeFile(slidesPath, newContent, 'utf-8')
      // eslint-disable-next-line no-console
      console.log(`Added language ${language} to htmlAttrs in ${slidesPath}`)
    }
    else {
      // No htmlAttrs, add it
      const updatedFrontmatter = `htmlAttrs:
  lang: ${language}
  dir: ltr
${frontmatter}`
      const newContent = content.replace(frontmatterMatch[1], updatedFrontmatter)
      await writeFile(slidesPath, newContent, 'utf-8')
      // eslint-disable-next-line no-console
      console.log(`Added language ${language} to ${slidesPath}`)
    }
  }
  catch (error) {
    console.warn(`Could not update slides.md at ${slidesPath}:`, error)
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

  // Sort years in descending order
  const years = Object.keys(talksByYear)
    .map(Number)
    .sort((a, b) => b - a)

  // Build README content
  let content = `# Talks

Slides from my [talks](https://soubiran.dev/talks).

`

  for (const year of years) {
    content += `###### ${year}\n\n`

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
 * Main function to generate README
 */
export async function generateReadme(rootPath = '.'): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('Scanning talk folders...')

  // Get all folders matching date pattern (YYYY-MM-DD or YYYY-MM-DD-N)
  const folders = (await readdir(rootPath, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder.match(/^\d{4}-\d{2}-\d{2}/))
    .sort((a, b) => -a.localeCompare(b))

  // eslint-disable-next-line no-console
  console.log(`Found ${folders.length} talk folders`)

  // Extract metadata from each folder
  const talks: TalkMetadata[] = []
  for (const folder of folders) {
    const folderPath = resolve(rootPath, folder)
    const metadata = await extractTalkMetadata(folderPath)
    if (metadata) {
      talks.push(metadata)

      // If language is missing, try to detect and update
      if (!metadata.language) {
        // eslint-disable-next-line no-console
        console.log(`Language missing for ${folder}, defaulting to 'fr'`)
        metadata.language = 'fr' // Default to French for this repository

        // Update slides.md with the language
        const slidesPath = resolve(folderPath, 'src', 'slides.md')
        await updateSlidesWithLanguage(slidesPath, metadata.language)
      }
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
