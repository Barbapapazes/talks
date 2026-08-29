export type Locale = 'en' | 'fr'
export type SourceLanguage = Locale

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

export interface LocalizedTalkArtifacts<L extends Locale = Locale> {
  summary: `summary.${L}.md`
  transcript?: `transcript.${L}.md`
}

export interface TalkLinks {
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

export interface LocalizedTalkMetadata<L extends Locale = Locale> {
  id: string
  locale: L
  sourceLanguage: SourceLanguage
  slug: string
  title: string
  description: string
  date: string
  topics: string[]
  event: Event
  links: TalkLinks
  artifacts?: LocalizedTalkArtifacts<L>
}

export type LocalizedTalkCatalog<L extends Locale = Locale> = LocalizedTalkMetadata<L>[]
