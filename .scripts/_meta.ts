import type { MetaEntry, Package, TalkCatalogEntry, TalksCatalog } from './_types'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'

interface TalkSource {
  packageJson: Package
  frontmatter: Record<string, unknown>
}

export interface TalkEntries {
  meta: MetaEntry
  catalog: TalkCatalogEntry
}

export async function generateMetaEntry(dir: string): Promise<MetaEntry> {
  const source = await loadTalkSource(dir)

  return mapTalkMetaEntry(dir, source.packageJson, source.frontmatter)
}

export async function generateTalkEntries(dir: string): Promise<TalkEntries> {
  const source = await loadTalkSource(dir)
  const meta = mapTalkMetaEntry(dir, source.packageJson, source.frontmatter)

  return {
    meta,
    catalog: toTalkCatalogEntry(meta, source.frontmatter),
  }
}

async function loadTalkSource(dir: string): Promise<TalkSource> {
  const pkg = await readFile(join(dir, 'src', 'package.json'), 'utf-8')
  const slides = await readFile(join(dir, 'src', 'slides.md'), 'utf-8')

  return {
    packageJson: JSON.parse(pkg) as Package,
    frontmatter: matter(slides).data,
  }
}

export function mapTalkMetaEntry(dir: string, pkg: Package, frontmatter: Record<string, unknown>): MetaEntry {
  const prefix = `${dir}/${pkg.name}`
  const url = `https://talks.soubiran.dev/${prefix}`
  const thumbnail_url = `${url}/thumbnail.png`
  const thumbnail_dark_url = `${url}/thumbnail-dark.png`
  const pdf_url = `${url}/pdf`
  const github_url = `${url}/src`
  const recording_url = `${url}/recording`
  const audio_url = `${url}/audio`
  const transcript_url = `https://soubiran.dev/talks/${prefix}`
  const article_url = `${url}/article`

  return {
    language: toLanguage(frontmatter),
    name: toOptionalString(frontmatter.title) ?? pkg.name,
    topics: normalizeTopics(frontmatter.keywords),
    event: pkg.event.name,
    event_url: pkg.event.url,
    prefix,
    // Keep only the first 10 characters (date) because talks given on the same day are suffixed with -1, -2, ...
    date: dir.slice(0, 10),
    description: pkg.description,
    folder: dir,
    url,
    thumbnail_url,
    thumbnail_dark_url,
    pdf_url,
    github_url,
    recording_url: pkg.recording ? recording_url : undefined,
    audio_url: pkg.recording ? audio_url : undefined,
    transcript_url: pkg.recording ? transcript_url : undefined,
    article_url: pkg.article ? article_url : undefined,
    location: pkg.event.location,
  }
}

export function toTalkCatalogEntry(entry: MetaEntry, frontmatter: Record<string, unknown>): TalkCatalogEntry {
  return {
    id: entry.prefix,
    type: 'talk',
    title: entry.name,
    date: entry.date,
    url: entry.url,
    language: entry.language,
    topics: normalizeTopics(frontmatter.keywords),
    event: {
      name: entry.event,
      url: entry.event_url,
      location: {
        city: entry.location.city,
        country: entry.location.country,
      },
    },
    links: {
      slides: entry.url,
      source: entry.github_url ?? `${entry.url}/src`,
      pdf: entry.pdf_url,
      ...(entry.recording_url ? { recording: entry.recording_url } : {}),
      ...(entry.audio_url ? { audio: entry.audio_url } : {}),
      ...(entry.transcript_url ? { transcript: entry.transcript_url } : {}),
      ...(entry.article_url ? { article: entry.article_url } : {}),
    },
    ...(entry.description ? { description: entry.description } : {}),
  }
}

export function createTalksCatalog(data: TalkCatalogEntry[], generatedAt = new Date().toISOString()): TalksCatalog {
  return {
    schemaVersion: '1.0',
    generatedAt,
    site: {
      id: 'talks.soubiran.dev',
      url: 'https://talks.soubiran.dev',
    },
    data,
  }
}

function toLanguage(frontmatter: Record<string, unknown>): string {
  const htmlAttrs = frontmatter.htmlAttrs

  if (!htmlAttrs || typeof htmlAttrs !== 'object' || Array.isArray(htmlAttrs)) {
    return 'en'
  }

  return toOptionalString((htmlAttrs as Record<string, unknown>).lang) ?? 'en'
}

function normalizeTopics(value: unknown): string[] {
  const topics = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : []

  return [...new Set(topics
    .filter((topic): topic is string => typeof topic === 'string')
    .map(topic => topic.trim().toLowerCase())
    .filter(Boolean))]
    .sort((left, right) => left.localeCompare(right))
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}
