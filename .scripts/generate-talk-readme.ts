import type { Package } from './_types.ts'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { getPackagesJson } from './_utils.ts'

/**
 * Generate README for a single talk directory
 */
async function generateTalkReadme(dir: string): Promise<void> {
  // Read package.json
  const pkg = await readFile(join(dir, 'src', 'package.json'), 'utf-8')
  const packageJson = JSON.parse(pkg) as Package

  // Read slides.md to get the title
  const slides = await readFile(join(dir, 'src', 'slides.md'), 'utf-8')
  const frontmatter = matter(slides).data

  // Extract information
  const title = frontmatter.title
  const date = dir.slice(0, 10).replace(/-/g, '/') // Convert YYYY-MM-DD to YYYY/MM/DD
  const eventName = packageJson.event.name
  const eventUrl = packageJson.event.url

  // Generate README content
  const content = `# ${title}

${date} - [${eventName}](${eventUrl})
`

  // Write README.md
  await writeFile(join(dir, 'README.md'), content)
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

generateAllTalkReadmes()
