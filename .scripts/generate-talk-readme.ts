import type { Package } from './_types.ts'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { getPackagesJson } from './_utils.ts'

/**
 * Generate README for a single talk directory
 */
async function generateTalkReadme(dir: string): Promise<void> {
  try {
    // Read package.json
    const pkg = await readFile(join(dir, 'src', 'package.json'), 'utf-8')
    const packageJson = JSON.parse(pkg) as Package

    // Read slides.md to get the title
    const slides = await readFile(join(dir, 'src', 'slides.md'), 'utf-8')
    const frontmatter = matter(slides).data

    // Extract information
    const title = frontmatter.title
    // Extract date from directory name (expects YYYY-MM-DD format at start)
    const dateMatch = dir.match(/^(\d{4}-\d{2}-\d{2})/)
    if (!dateMatch) {
      throw new Error(`Directory name does not start with YYYY-MM-DD format: ${dir}`)
    }
    const date = dateMatch[1].replace(/-/g, '/') // Convert YYYY-MM-DD to YYYY/MM/DD
    const eventName = packageJson.event.name
    const eventUrl = packageJson.event.url

    // Generate README content
    const content = `# ${title}

${date} - [${eventName}](${eventUrl})
`

    // Write README.md
    await writeFile(join(dir, 'README.md'), content)
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to generate README for ${dir}: ${errorMessage}`)
  }
}

/**
 * Generate READMEs for all talks
 */
async function generateAllTalkReadmes() {
  const packagesJson = getPackagesJson()

  for (const packagePath of packagesJson) {
    const dir = packagePath.split('/')[0]
    await generateTalkReadme(dir)
  }
}

generateAllTalkReadmes().catch((error) => {
  console.error('Failed to generate talk READMEs:', error)
  process.exit(1)
})
