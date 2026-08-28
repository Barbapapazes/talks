export interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
}

export interface Event {
  name: string
  url: string
  location: Location
}

export interface Package {
  date: string
  name: string
  event: Event
  description?: string
  recording?: string
  article?: string
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

export interface TalkCatalogEvent {
  name: string
  url: string
  location: Location
}

export interface TalkCatalogLinks {
  slides: string
  thumbnail: string
  thumbnailDark: string
  source: string
  pdf: string
  recording?: string
  audio?: string
  transcript?: string
  article?: string
}

export interface TalkCatalogEntry {
  id: string
  type: 'talk'
  title: string
  date: string
  url: string
  language: string
  topics: string[]
  event: TalkCatalogEvent
  links: TalkCatalogLinks
  description?: string
}

export interface TalksCatalog {
  schemaVersion: '1.0'
  generatedAt: string
  site: {
    id: 'talks.soubiran.dev'
    url: 'https://talks.soubiran.dev'
  }
  data: TalkCatalogEntry[]
}
