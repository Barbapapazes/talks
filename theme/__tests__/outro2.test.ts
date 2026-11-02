import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AdditionalContent from '../components/AdditionalContent.vue'
import Feedback from '../components/Feedback.vue'
import Fireworks from '../components/Fireworks.vue'
import Footer from '../components/Footer.vue'
import Outro2 from '../layouts/outro2.vue'

const slideContext = {
  $frontmatter: {} as Record<string, unknown>,
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
})

describe('outro2', () => {
  it('shows a simple closing with the speaker and two actions', () => {
    const wrapper = shallowMount(Outro2)

    expect(wrapper.get('h1').text()).toBe('Thank you!')
    expect(wrapper.text()).toContain('Estéban Soubiran')
    expect(wrapper.text()).toContain('Agent Builder at Takima')
    expect(wrapper.getComponent(Feedback).props('label')).toBe('Share your feedback')
    expect(wrapper.getComponent(AdditionalContent).props('label')).toBe('Get the next episodes')
    expect(wrapper.findComponent(Fireworks).exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Presented by')
  })

  it('shows only the website link in the footer', () => {
    const wrapper = shallowMount(Outro2, { global: { stubs: { Footer } } })
    const links = wrapper.findAll('a')

    expect(links).toHaveLength(1)
    expect(links[0].text()).toBe('soubiran.dev')
    expect(links[0].attributes('href')).toBe('https://soubiran.dev')
  })

  it('allows custom action labels and a feedback URL', () => {
    slideContext.$frontmatter.customFeedbackLabel = 'How was this talk?'
    slideContext.$frontmatter.customFeedbackUrl = 'https://example.com/feedback'
    slideContext.$frontmatter.additionalContentLabel = 'Subscribe to the newsletter'
    const wrapper = shallowMount(Outro2)

    expect(wrapper.getComponent(Feedback).props('label')).toBe('How was this talk?')
    expect(wrapper.getComponent(Feedback).props('customFeedbackUrl')).toBe('https://example.com/feedback')
    expect(wrapper.getComponent(AdditionalContent).props('label')).toBe('Subscribe to the newsletter')
  })

  it('allows a deck to hide the placeholder feedback QR until Inalia is connected', () => {
    slideContext.$frontmatter.feedbackPlaceholder = false
    const wrapper = shallowMount(Outro2)

    expect(wrapper.getComponent(Feedback).props('enablePlaceholder')).toBe(false)
  })

  it('enables the placeholder by default', () => {
    const wrapper = shallowMount(Outro2)

    expect(wrapper.getComponent(Feedback).props('enablePlaceholder')).toBe(true)
  })

  it('allows a slide to hide feedback', () => {
    slideContext.$frontmatter.feedback = false
    const wrapper = shallowMount(Outro2)

    expect(wrapper.findComponent(Feedback).exists()).toBe(false)
  })
})
