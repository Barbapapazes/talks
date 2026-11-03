// @vitest-environment node
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parseSync } from '@slidev/parser'
import { describe, expect, it } from 'vitest'
import { updateSlideTimings } from '../plugins/visualize/timing'

async function fixture(content: string, run: (path: string) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), 'talk-timing-'))
  const path = join(root, 'slides.md')
  try {
    await writeFile(path, content)
    await run(path)
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
}

describe('updateSlideTimings', () => {
  it('updates existing timings, inserts missing frontmatter, and preserves content', async () => {
    const content = '---\ntitle: Test\ntiming: 9\n---\n# First\n\n<!--\none two three four five six seven eight nine ten\n-->\n\n---\n\n# Second\n\nSome content.\n\n---\nlayout: center\n---\n# Third\n\n<!--\none two three four five six seven eight nine ten\n-->\n'
    await fixture(content, async (path) => {
      expect(await updateSlideTimings(path)).toEqual({ updatedCount: 3, totalWords: 20, wpm: 100, totalMinutes: 0 })
      const updated = await readFile(path, 'utf8')
      const parsed = parseSync(updated, path)
      expect(parsed.slides.map(slide => slide.frontmatter.timing)).toEqual([0.1, 0, 0.1])
      expect(parsed.slides[0].frontmatter.title).toBe('Test')
      expect(parsed.slides[2].frontmatter.layout).toBe('center')
      expect(parsed.slides.map(slide => slide.content)).toEqual(parseSync(content, path).slides.map(slide => slide.content))
      await updateSlideTimings(path)
      expect(await readFile(path, 'utf8')).toBe(updated)
    })
  })

  it('handles a first slide without frontmatter, custom WPM, and CRLF', async () => {
    await fixture('# First\r\n\r\n<!--\r\none two three four five six seven eight nine ten\r\n-->\r\n', async (path) => {
      await updateSlideTimings(path, { wpm: 50 })
      const updated = await readFile(path, 'utf8')
      expect(updated).toMatch(/^---\r\ntiming: 0.2\r\n---\r\n/)
      expect(updated.replaceAll('\r\n', '')).not.toContain('\n')
    })
  })

  it.each([0, -10, Number.NaN, Number.POSITIVE_INFINITY])('rejects invalid WPM %s without writing', async (wpm) => {
    await fixture('# First\n', async (path) => {
      await expect(updateSlideTimings(path, { wpm })).rejects.toThrow('positive number')
      expect(await readFile(path, 'utf8')).toBe('# First\n')
    })
  })
})
