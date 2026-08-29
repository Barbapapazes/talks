import type { Locale, LocalizedTalkMetadata, TalkLinks } from '@soubiran/talks'
import type { LocalizedTalkMetadataByLocale, MetaEntry, Package } from './_types'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { validateTalkPackage } from './_validation.ts'

export interface TalkEntries {
  meta: MetaEntry
  localizedMetadata: LocalizedTalkMetadataByLocale
}

export async function generateMetaEntry(dir: string): Promise<MetaEntry> {
  const packageJson = await loadTalkPackage(dir)

  return mapTalkMetaEntry(dir, packageJson)
}

export async function generateTalkEntries(dir: string): Promise<TalkEntries> {
  return generateTalkEntriesFromPackage(dir, await loadTalkPackage(dir))
}

export function generateTalkEntriesFromPackage(dir: string, pkg: Package): TalkEntries {
  const meta = mapTalkMetaEntry(dir, pkg)

  return {
    meta,
    localizedMetadata: mapLocalizedTalkMetadataByLocale(dir, pkg),
  }
}

async function loadTalkPackage(dir: string): Promise<Package> {
  const pkg = await readFile(join(dir, 'src', 'package.json'), 'utf-8')

  return validateTalkPackage(dir, JSON.parse(pkg))
}

export function mapTalkMetaEntry(dir: string, pkg: Package): MetaEntry {
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
    language: pkg.sourceLanguage,
    name: pkg.locales[pkg.sourceLanguage].title,
    topics: sortedTopics(pkg.topics),
    event: pkg.event.name,
    event_url: pkg.event.url,
    prefix,
    date: pkg.date,
    description: pkg.locales[pkg.sourceLanguage].description,
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

export function mapLocalizedTalkMetadata<L extends Locale>(dir: string, pkg: Package, locale: L): LocalizedTalkMetadata<L> {
  const prefix = `${dir}/${pkg.name}`
  const url = `https://talks.soubiran.dev/${prefix}`
  const metadata = pkg.locales[locale]

  return {
    id: metadata.id,
    locale,
    sourceLanguage: pkg.sourceLanguage,
    slug: prefix,
    title: metadata.title,
    description: metadata.description,
    date: pkg.date,
    topics: sortedTopics(pkg.topics),
    event: {
      name: pkg.event.name,
      url: pkg.event.url,
      location: {
        city: pkg.event.location.city,
        country: pkg.event.location.country,
        latitude: pkg.event.location.latitude,
        longitude: pkg.event.location.longitude,
      },
    },
    links: createTalkLinks(url, pkg),
    artifacts: {
      summary: `summary.${locale}.md`,
      ...(pkg.recording ? { transcript: `transcript.${locale}.md` } : {}),
    },
  }
}

function mapLocalizedTalkMetadataByLocale(dir: string, pkg: Package): LocalizedTalkMetadataByLocale {
  return {
    en: mapLocalizedTalkMetadata(dir, pkg, 'en'),
    fr: mapLocalizedTalkMetadata(dir, pkg, 'fr'),
  }
}

function createTalkLinks(url: string, pkg: Package): TalkLinks {
  const recordingUrl = `${url}/recording`
  const audioUrl = `${url}/audio`
  const transcriptUrl = `https://soubiran.dev/talks/${url.slice('https://talks.soubiran.dev/'.length)}`
  const articleUrl = `${url}/article`

  return {
    slides: url,
    thumbnail: `${url}/thumbnail.png`,
    thumbnailDark: `${url}/thumbnail-dark.png`,
    source: `${url}/src`,
    pdf: `${url}/pdf`,
    ...(pkg.recording
      ? {
          recording: recordingUrl,
          audio: audioUrl,
          transcript: transcriptUrl,
        }
      : {}),
    ...(pkg.article ? { article: articleUrl } : {}),
  }
}

function sortedTopics(topics: readonly string[]): string[] {
  return [...topics].sort((left, right) => left.localeCompare(right))
}
