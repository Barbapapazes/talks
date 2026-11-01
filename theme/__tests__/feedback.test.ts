import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Feedback from '../components/Feedback.vue'

const state = vi.hoisted(() => ({
  talk: null as null | { urls: { tiny_feedback: string } },
}))

vi.mock('slidev-addon-inalia', () => ({
  InaliaQR: { name: 'InaliaQR', props: ['url'], template: '<div />' },
  InaliaShortUrl: { name: 'InaliaShortUrl', props: ['url'], template: '<div />' },
  useInaliaTalk: () => ({ talk: state.talk }),
}))

afterEach(() => {
  state.talk = null
})

describe('feedback QR', () => {
  it('does not show a placeholder without an Inalia connection', () => {
    const wrapper = shallowMount(Feedback)

    expect(wrapper.findComponent({ name: 'InaliaQR' }).exists()).toBe(false)
  })

  it('renders an explicit feedback URL without a connection or placeholder', () => {
    const wrapper = shallowMount(Feedback, {
      props: { customFeedbackUrl: 'https://api.inalia.app/f/aAtNvL', enablePlaceholder: false },
    })

    expect(wrapper.getComponent({ name: 'InaliaQR' }).props('url')).toBe('https://api.inalia.app/f/aAtNvL')
    expect(wrapper.getComponent({ name: 'InaliaShortUrl' }).props('url')).toBe('api.inalia.app/f/aAtNvL')
  })

  it('uses the connected talk feedback URL', () => {
    state.talk = { urls: { tiny_feedback: 'https://api.inalia.app/f/talk' } }
    const wrapper = shallowMount(Feedback)

    expect(wrapper.getComponent({ name: 'InaliaQR' }).props('url')).toBe('https://api.inalia.app/f/talk')
  })

  it('gives an explicit URL precedence over the connected talk', () => {
    state.talk = { urls: { tiny_feedback: 'https://api.inalia.app/f/talk' } }
    const wrapper = shallowMount(Feedback, {
      props: { customFeedbackUrl: 'https://feedback.example.org/session' },
    })

    expect(wrapper.getComponent({ name: 'InaliaQR' }).props('url')).toBe('https://feedback.example.org/session')
  })

  it('only uses example.com when placeholders are explicitly enabled', () => {
    const wrapper = shallowMount(Feedback, { props: { enablePlaceholder: true } })

    expect(wrapper.getComponent({ name: 'InaliaQR' }).props('url')).toBe('https://example.com')
  })
})
