import type { Package } from './_types.ts'
import { describe, expect, it } from 'vitest'
import { createTalksCatalog, mapTalkMetaEntry, toTalkCatalogEntry } from './_meta.ts'

const packageJson: Package = {
  date: 'ignored-by-generator',
  name: 'llm-catalogs',
  description: 'A talk about well-shaped catalogs.',
  recording: 'https://videos.example.test/catalogs',
  event: {
    name: 'ExampleConf',
    url: 'https://example.test',
    location: {
      city: 'Paris',
      country: 'France',
      latitude: 48.8566,
      longitude: 2.3522,
    },
  },
}

describe('talk catalog', () => {
  it('maps legacy metadata to a normalized talk catalog entry', () => {
    const meta = mapTalkMetaEntry('2025-11-07-2', packageJson, {
      title: 'LLM catalogs',
      htmlAttrs: { lang: 'fr' },
    })
    const entry = toTalkCatalogEntry(meta, {
      keywords: ['Vue', ' AI ', 'vue'],
    })

    expect(entry).toEqual({
      id: '2025-11-07-2/llm-catalogs',
      type: 'talk',
      title: 'LLM catalogs',
      description: 'A talk about well-shaped catalogs.',
      date: '2025-11-07',
      url: 'https://talks.soubiran.dev/2025-11-07-2/llm-catalogs',
      language: 'fr',
      topics: ['ai', 'vue'],
      event: {
        name: 'ExampleConf',
        url: 'https://example.test',
        location: {
          city: 'Paris',
          country: 'France',
        },
      },
      links: {
        slides: 'https://talks.soubiran.dev/2025-11-07-2/llm-catalogs',
        source: 'https://talks.soubiran.dev/2025-11-07-2/llm-catalogs/src',
        pdf: 'https://talks.soubiran.dev/2025-11-07-2/llm-catalogs/pdf',
        recording: 'https://talks.soubiran.dev/2025-11-07-2/llm-catalogs/recording',
        audio: 'https://talks.soubiran.dev/2025-11-07-2/llm-catalogs/audio',
        transcript: 'https://soubiran.dev/talks/2025-11-07-2/llm-catalogs',
      },
    })
  })

  it('omits unavailable optional talk links and applies envelope provenance', () => {
    const meta = mapTalkMetaEntry('2026-01-22', {
      ...packageJson,
      description: undefined,
      recording: undefined,
      article: undefined,
    }, {
      title: 'No recording',
    })
    const entry = toTalkCatalogEntry(meta, { keywords: 'TypeScript, typescript, LLM' })
    const catalog = createTalksCatalog([entry], '2026-08-16T12:00:00.000Z')

    expect(entry.links).toEqual({
      slides: 'https://talks.soubiran.dev/2026-01-22/llm-catalogs',
      source: 'https://talks.soubiran.dev/2026-01-22/llm-catalogs/src',
      pdf: 'https://talks.soubiran.dev/2026-01-22/llm-catalogs/pdf',
    })
    expect('description' in entry).toBe(false)
    expect(entry.topics).toEqual(['llm', 'typescript'])
    expect(catalog).toEqual({
      schemaVersion: '1.0',
      generatedAt: '2026-08-16T12:00:00.000Z',
      site: {
        id: 'talks.soubiran.dev',
        url: 'https://talks.soubiran.dev',
      },
      data: [entry],
    })
  })
})
