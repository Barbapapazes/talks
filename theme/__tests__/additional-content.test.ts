import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AdditionalContent from '../components/AdditionalContent.vue'

const state = vi.hoisted(() => ({
  $frontmatter: {} as Record<string, unknown>,
}))

vi.mock('@slidev/client', () => ({
  useSlideContext: () => state,
}))

vi.mock('slidev-addon-inalia', () => ({
  InaliaQR: { name: 'InaliaQR', props: ['url'], template: '<div />' },
  InaliaShortUrl: { name: 'InaliaShortUrl', props: ['url'], template: '<a />' },
}))

afterEach(() => {
  state.$frontmatter = {}
})

describe('additional content QR', () => {
  it('hides the QR and link when no URL is configured', () => {
    const wrapper = shallowMount(AdditionalContent)

    expect(wrapper.findComponent({ name: 'InaliaQR' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'InaliaShortUrl' }).exists()).toBe(false)
  })

  it('passes the full URL to both the QR and the link', () => {
    state.$frontmatter.additionalContentUrl = 'https://beta.soubiran.dev/newsletter'
    const wrapper = shallowMount(AdditionalContent, {
      props: { label: 'Subscribe to the newsletter' },
    })

    expect(wrapper.text()).toContain('Subscribe to the newsletter')
    expect(wrapper.getComponent({ name: 'InaliaQR' }).props('url')).toBe('https://beta.soubiran.dev/newsletter')
    expect(wrapper.getComponent({ name: 'InaliaShortUrl' }).props('url')).toBe('https://beta.soubiran.dev/newsletter')
  })

  it('keeps the default label', () => {
    state.$frontmatter.additionalContentUrl = 'https://example.com'
    const wrapper = shallowMount(AdditionalContent)

    expect(wrapper.text()).toContain('Contenu additionnel')
  })
})
