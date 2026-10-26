import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@slidev/parser'
import { getPackagesJson } from './_utils.ts'

async function generateNotes() {
  const root = fileURLToPath(new URL('..', import.meta.url))
  process.chdir(root)

  const sections = ['# Speaker notes']
  let noteCount = 0

  for (const packagePath of getPackagesJson().sort()) {
    const slidesPath = join(dirname(packagePath), 'slides.md')
    const content = await readFile(slidesPath, 'utf-8')
    const { slides } = parseSync(content, slidesPath)
    const notes: string[] = []

    for (const [index, slide] of slides.entries()) {
      const note = slide.note?.trim()
      if (!note)
        continue

      notes.push(`### Slide ${index + 1}\n\n${note}`)
      noteCount++
    }

    if (notes.length > 0)
      sections.push(`## ${slidesPath}\n\n${notes.join('\n\n')}`)
  }

  await writeFile(join(root, 'notes.md'), `${sections.join('\n\n')}\n`, 'utf-8')
  console.warn(`✓ Extracted notes from ${noteCount} slide(s) to notes.md`)
}

generateNotes().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
