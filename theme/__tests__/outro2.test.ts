import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AdditionalContent from '../components/AdditionalContent.vue'
import Feedback from '../components/Feedback.vue'
import Outro2 from '../layouts/outro2.vue'

const slideContext = {
  $frontmatter: {} as Record<string, unknown>,
  $slidev: {
    configs: {
      title: 'A talk',
      event: 'An event',
      date: 'September 29',
      htmlAttrs: undefined as { lang: string } | undefined,
    },
  },
}

vi.mock('@slidev/client', async () => {
  const actual = await vi.importActual<typeof import('@slidev/client')>('@slidev/client')
  return { ...actual, useSlideContext: () => slideContext }
})

vi.mock('slidev-addon-inalia', () => ({
  InaliaQR: { template: '<div />' },
  InaliaShortUrl: { template: '<div />' },
  useInaliaTalk: () => ({ talk: undefined }),
}))

afterEach(() => {
  for (const key of Object.keys(slideContext.$frontmatter))
    delete slideContext.$frontmatter[key]

  slideContext.$slidev.configs.htmlAttrs = undefined
})

describe('outro2 language', () => {
  it('keeps French as the default for existing slides', () => {
    const wrapper = shallowMount(Outro2)

    expect(wrapper.text()).toContain('C’était')
    expect(wrapper.text()).toContain('Présenté par')
    expect(wrapper.text()).toContain('Agent Builder chez Takima')
    expect(wrapper.getComponent(Feedback).props('label')).toBe('Votre feedback')
    expect(wrapper.getComponent(AdditionalContent).props('label')).toBe('Contenu additionnel')
  })

  it('uses English when the presentation sets htmlAttrs.lang: en', () => {
    slideContext.$slidev.configs.htmlAttrs = { lang: 'en' }
    const wrapper = shallowMount(Outro2)

    expect(wrapper.text()).toContain('That was')
    expect(wrapper.text()).toContain('Presented by')
    expect(wrapper.text()).toContain('Agent Builder at Takima')
    expect(wrapper.getComponent(Feedback).props('label')).toBe('Your feedback')
    expect(wrapper.getComponent(AdditionalContent).props('label')).toBe('Additional content')
  })

  it('respects the existing feedback opt-out', () => {
    slideContext.$slidev.configs.htmlAttrs = { lang: 'en' }
    slideContext.$frontmatter.feedback = false
    const wrapper = shallowMount(Outro2)

    expect(wrapper.findComponent(Feedback).exists()).toBe(false)
  })
})
