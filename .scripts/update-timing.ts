import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { parseSync } from '@slidev/parser'
import { selectDeck } from './_utils.ts'

const DEFAULT_WPM = 100

function countWords(text: string | undefined): number {
  if (!text)
    return 0
  return text.trim().split(/\s+/).filter(Boolean).length
}

async function updateTiming() {
  const folder = process.argv[2]
  const allDecks = folder ? { folder } : await selectDeck()

  if (!allDecks.folder) {
    console.warn('No deck selected')
    return
  }

  const wpm = process.argv[3] ? Number(process.argv[3]) : DEFAULT_WPM

  const deckPath = fileURLToPath(new URL(`../${allDecks.folder}/src`, import.meta.url))
  const slidesPath = join(deckPath, 'slides.md')
  const slidesContent = readFileSync(slidesPath, 'utf-8')

  const parsed = parseSync(slidesContent, slidesPath)
  const lines = slidesContent.split('\n')

  let totalWords = 0
  let updatedCount = 0

  // Process in reverse order so line indices stay valid as we mutate `lines`
  for (const slide of parsed.slides.toReversed()) {
    const wordCount = countWords(slide.note)
    totalWords += wordCount

    const timing = Math.round((wordCount / wpm) * 10) / 10

    // Frontmatter YAML lives between start+1 (inclusive) and contentStart-2 (inclusive)
    const fmStart = slide.start + 1
    const fmEnd = slide.contentStart - 1 // exclusive (this line is the closing ---)

    let updated = false
    for (let i = fmStart; i < fmEnd; i++) {
      if (lines[i].startsWith('timing:')) {
        lines[i] = `timing: ${timing}`
        updated = true
        break
      }
    }

    if (!updated) {
      if (slide.contentStart > slide.start) {
        lines.splice(fmEnd, 0, `timing: ${timing}`)
      }
      else {
        // Later slides reuse their existing separator as the opening frontmatter delimiter.
        const frontmatter = [`timing: ${timing}`, '---']
        if (slide.index === 0)
          frontmatter.unshift('---')
        lines.splice(slide.start, 0, ...frontmatter)
      }
    }

    updatedCount++
  }

  writeFileSync(slidesPath, lines.join('\n'), 'utf-8')

  const totalMinutes = Math.round(totalWords / wpm)
  console.warn(`✓ Updated ${updatedCount} slide(s) in ${slidesPath}`)
  console.warn(`\nStats:`)
  console.warn(`  Words per minute : ${wpm}`)
  console.warn(`  Total words      : ${totalWords}`)
  console.warn(`  Estimated total  : ~${totalMinutes} min`)
}

updateTiming().catch(console.error)
