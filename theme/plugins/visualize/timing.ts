import { readFile, writeFile } from 'node:fs/promises'
import { parseSync } from '@slidev/parser'

export const DEFAULT_WPM = 100

/** Update the entry Markdown file only, matching the CLI's behavior. */
export async function updateSlideTimings(entryPath: string, { wpm = DEFAULT_WPM } = {}) {
  if (!Number.isFinite(wpm) || wpm <= 0)
    throw new Error('Words per minute must be a positive number')

  const content = await readFile(entryPath, 'utf8')
  const parsed = parseSync(content, entryPath)
  const newline = content.includes('\r\n') ? '\r\n' : '\n'
  const lines = content.split(/\r?\n/)
  let totalWords = 0

  // Work backwards so inserting frontmatter does not shift earlier slides.
  for (const slide of parsed.slides.toReversed()) {
    const wordCount = slide.note?.trim().split(/\s+/).filter(Boolean).length || 0
    totalWords += wordCount
    const timing = Math.round((wordCount / wpm) * 10) / 10
    const fmStart = slide.start + 1
    const fmEnd = slide.contentStart - 1
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
        // Later slides reuse their separator as the opening delimiter.
        const frontmatter = [`timing: ${timing}`, '---']
        if (slide.index === 0)
          frontmatter.unshift('---')
        lines.splice(slide.start, 0, ...frontmatter)
      }
    }
  }

  const updated = lines.join(newline)
  if (updated !== content)
    await writeFile(entryPath, updated, 'utf8')

  return { updatedCount: parsed.slides.length, totalWords, wpm, totalMinutes: Math.round(totalWords / wpm) }
}
