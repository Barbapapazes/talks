import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@slidev/parser'
import { selectDeck } from './_utils.ts'

async function generateNotes() {
  const { folder } = await selectDeck()

  if (!folder) {
    console.warn('No deck selected')
    return
  }

  const root = fileURLToPath(new URL('..', import.meta.url))
  const slidesPath = join(folder, 'src', 'slides.md')
  const content = await readFile(join(root, slidesPath), 'utf-8')
  const { slides } = parseSync(content, join(root, slidesPath))
  const sections = [`# Speaker notes\n\n## ${slidesPath}`]
  let noteCount = 0

  for (const [index, slide] of slides.entries()) {
    const note = slide.note?.trim()
    if (!note)
      continue

    sections.push(`### Slide ${index + 1}\n\n${note}`)
    noteCount++
  }

  await writeFile(join(root, 'notes.md'), `${sections.join('\n\n')}\n`, 'utf-8')
  console.warn(`✓ Extracted notes from ${noteCount} slide(s) to notes.md`)
}

generateNotes().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
