import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { DEFAULT_WPM, updateSlideTimings } from '../theme/plugins/visualize/timing.ts'
import { selectDeck } from './_utils.ts'

async function updateTiming() {
  const folder = process.argv[2]
  const allDecks = folder ? { folder } : await selectDeck()

  if (!allDecks.folder) {
    console.warn('No deck selected')
    return
  }

  const wpm = process.argv[3] ? Number(process.argv[3]) : DEFAULT_WPM
  const slidesPath = fileURLToPath(new URL(`../${allDecks.folder}/src/slides.md`, import.meta.url))
  const result = await updateSlideTimings(slidesPath, { wpm })

  console.warn(`✓ Updated ${result.updatedCount} slide(s) in ${slidesPath}`)
  console.warn(`\nStats:`)
  console.warn(`  Words per minute : ${result.wpm}`)
  console.warn(`  Total words      : ${result.totalWords}`)
  console.warn(`  Estimated total  : ~${result.totalMinutes} min`)
}

updateTiming().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
