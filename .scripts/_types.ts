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
