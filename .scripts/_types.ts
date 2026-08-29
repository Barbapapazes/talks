import type { Event, Locale, LocalizedTalkMetadata, Location, SourceLanguage } from '@soubiran/talks'

export type { Event, Locale, LocalizedTalkMetadata, Location, SourceLanguage, TalkLinks } from '@soubiran/talks'

export const LOCALES = ['en', 'fr'] as const

export interface PackageLocaleMetadata {
  id: string
  title: string
  description: string
}

export interface PackageLocales {
  en: PackageLocaleMetadata
  fr: PackageLocaleMetadata
}

export interface Package {
  date: string
  name: string
  event: Event
  sourceLanguage: SourceLanguage
  topics: string[]
  locales: PackageLocales
  description?: string
  recording?: string
  article?: string
}

export type LocalizedTalkMetadataByLocale = {
  [L in Locale]: LocalizedTalkMetadata<L>
}

export interface MetaEntry {
  language: string
  name: string
  topics: string[]
  date: string
  prefix: string
  event: string
  event_url: string
  description?: string
  folder: string
  url: string
  pdf_url: string
  thumbnail_url: string
  thumbnail_dark_url: string
  github_url?: string
  recording_url?: string
  audio_url?: string
  transcript_url?: string
  article_url?: string
  location: Location
}
