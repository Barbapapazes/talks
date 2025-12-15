export interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
}

export interface Package {
  date: string
  name: string
  event: string
  description?: string
  recording?: string
  article?: string
  location?: Location
}

export interface MetaEntry {
  language: string
  name: string
  date: string
  prefix: string
  event: string
  description?: string
  folder: string
  url: string
  pdf_url: string
  thumbnail_url: string
  github_url?: string
  recording_url?: string
  audio_url?: string
  transcript_url?: string
  article_url?: string
  location?: Location
}
