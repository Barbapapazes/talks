import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import matter from 'gray-matter'
import { generateMetaEntry } from './_meta.ts'
import { getPackagesJson } from './_utils.ts'

const TRANSCRIPT_LANGUAGES = ['en', 'fr']

export function updateTranscriptFrontmatter(content: string, id: string): string {
  const transcript = matter(content)
  const frontmatter = { ...transcript.data }

  delete frontmatter.title
  delete frontmatter.path

  return matter.stringify(transcript.content, {
    ...frontmatter,
    id,
  })
}

async function updateTranscriptsFrontmatter() {
  const packagesJson = getPackagesJson()
  let updatedTranscripts = 0

  for (const packageJson of packagesJson) {
    const folder = packageJson.split('/')[0]
    const meta = await generateMetaEntry(folder)

    for (const language of TRANSCRIPT_LANGUAGES) {
      const transcriptPath = join(folder, 'src', 'public', `transcript.${language}.md`)
      if (!existsSync(transcriptPath))
        continue

      const content = await readFile(transcriptPath, 'utf-8')
      const updatedContent = updateTranscriptFrontmatter(content, meta.prefix)

      if (content === updatedContent)
        continue

      await writeFile(transcriptPath, updatedContent)
      updatedTranscripts++
    }
  }

  console.warn(`✓ Updated ${updatedTranscripts} transcript frontmatter block(s)`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  updateTranscriptsFrontmatter().catch(console.error)
