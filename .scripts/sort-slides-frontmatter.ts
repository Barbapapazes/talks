import { readFileSync, writeFileSync } from 'node:fs'
import { basename, isAbsolute, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseSync } from '@slidev/parser'
import matter from 'gray-matter'
import { selectDeck } from './_utils.ts'

type Frontmatter = Record<string, unknown>

const SLIDE_FRONTMATTER_ORDER = [
  'name',
  'group',
  'ready',
  'timing',
  'choices',
  'layout',
  'img',
  'click',
  'clicks',
  'transition',
] as const

const slideFrontmatterOrderMap = new Map(
  SLIDE_FRONTMATTER_ORDER.map((key, index) => [key, index]),
)

function isPlainObject(value: unknown): value is Frontmatter {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function compareAlphabetically(left: string, right: string) {
  return left.localeCompare(right)
}

function compareSlideFrontmatterKeys(left: string, right: string) {
  const leftIndex = slideFrontmatterOrderMap.get(left)
  const rightIndex = slideFrontmatterOrderMap.get(right)

  if (leftIndex !== undefined && rightIndex !== undefined)
    return leftIndex - rightIndex

  if (leftIndex !== undefined)
    return -1

  if (rightIndex !== undefined)
    return 1

  return compareAlphabetically(left, right)
}

function sortKeysDeep<T>(value: T, compareKeys = compareAlphabetically, depth = 0): T {
  if (Array.isArray(value))
    return value.map(item => sortKeysDeep(item, compareKeys, depth + 1)) as T

  if (!isPlainObject(value))
    return value

  const comparator = depth === 0 ? compareKeys : compareAlphabetically

  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => comparator(left, right))
      .map(([key, nestedValue]) => [key, sortKeysDeep(nestedValue, compareKeys, depth + 1)]),
  ) as T
}

function serializeFrontmatterLines(frontmatter: Frontmatter, compareKeys = compareAlphabetically): string[] {
  if (Object.keys(frontmatter).length === 0)
    return []

  const serialized = matter.stringify('', sortKeysDeep(frontmatter, compareKeys)).replace(/\r\n/g, '\n')
  const match = serialized.match(/^---\n([\s\S]*?)\n---(?:\n*)$/)

  if (!match)
    throw new Error('Unable to serialize frontmatter')

  return match[1] ? match[1].split('\n') : []
}

export function reorderSlidesFrontmatterContent(content: string, slidesPath = 'slides.md') {
  const eol = content.includes('\r\n') ? '\r\n' : '\n'
  const parsed = parseSync(content, slidesPath)
  const lines = content.split(/\r?\n/)

  let updatedBlocks = 0

  for (const slide of parsed.slides.toReversed()) {
    if (slide.index === 0)
      continue

    const frontmatterStart = slide.start + 1
    const frontmatterEnd = slide.contentStart - 1

    if (frontmatterStart >= frontmatterEnd)
      continue

    const currentLines = lines.slice(frontmatterStart, frontmatterEnd)
    const sortedLines = serializeFrontmatterLines(slide.frontmatter as Frontmatter, compareSlideFrontmatterKeys)

    if (currentLines.join('\n') === sortedLines.join('\n'))
      continue

    lines.splice(frontmatterStart, frontmatterEnd - frontmatterStart, ...sortedLines)
    updatedBlocks++
  }

  return {
    content: lines.join(eol),
    updatedBlocks,
  }
}

function resolveSlidesPath(target: string) {
  const looksLikePath = target.includes('/') || target.startsWith('.') || target.startsWith('~')

  if (!looksLikePath)
    return fileURLToPath(new URL(`../${target}/src/slides.md`, import.meta.url))

  const absoluteTarget = isAbsolute(target) ? target : resolve(process.cwd(), target)

  if (basename(absoluteTarget) === 'slides.md')
    return absoluteTarget

  if (basename(absoluteTarget) === 'src')
    return join(absoluteTarget, 'slides.md')

  return join(absoluteTarget, 'src', 'slides.md')
}

async function sortSlidesFrontmatter() {
  const target = process.argv[2]
  const selectedDeck = target ? undefined : await selectDeck()

  if (!target && !selectedDeck?.folder) {
    console.warn('No deck selected')
    return
  }

  const slidesPath = target
    ? resolveSlidesPath(target)
    : fileURLToPath(new URL(`../${selectedDeck.folder}/src/slides.md`, import.meta.url))

  const slidesContent = readFileSync(slidesPath, 'utf-8')
  const { content, updatedBlocks } = reorderSlidesFrontmatterContent(slidesContent, slidesPath)

  if (updatedBlocks === 0) {
    console.warn(`✓ Frontmatter is already sorted in ${slidesPath}`)
    return
  }

  writeFileSync(slidesPath, content, 'utf-8')
  console.warn(`✓ Reordered ${updatedBlocks} frontmatter block(s) in ${slidesPath}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  sortSlidesFrontmatter().catch(console.error)
