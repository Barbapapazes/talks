import { z } from 'zod'

const locales = ['en', 'fr'] as const

export const talkMetadataSchema = z.object({
  id: z.string(),
  locale: z.enum(locales),
  sourceLanguage: z.enum(locales),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  topics: z.array(z.string()),
  event: z.object({
    name: z.string(),
    url: z.string().url(),
    location: z.object({
      city: z.string(),
      country: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  links: z.object({
    slides: z.string().url(),
    thumbnail: z.string().url(),
    thumbnailDark: z.string().url(),
    source: z.string().url(),
    pdf: z.string().url(),
    recording: z.string().url().optional(),
    youtubeEmbed: z.string().url().optional(),
    audio: z.string().url().optional(),
    transcript: z.string().url().optional(),
    article: z.string().url().optional(),
  }),
  artifacts: z.object({
    summary: z.string(),
    transcript: z.string().optional(),
  }),
})

type TalkMetadata = z.infer<typeof talkMetadataSchema>

export type Locale = TalkMetadata['locale']
export type SourceLanguage = TalkMetadata['sourceLanguage']
export type Location = TalkMetadata['event']['location']
export type Event = TalkMetadata['event']
export type LocalizedTalkArtifacts = TalkMetadata['artifacts']
export type TalkLinks = TalkMetadata['links']
export type LocalizedTalkMetadata<L extends Locale = Locale> = Omit<TalkMetadata, 'locale'> & { locale: L }
export type LocalizedTalkCatalog<L extends Locale = Locale> = LocalizedTalkMetadata<L>[]
