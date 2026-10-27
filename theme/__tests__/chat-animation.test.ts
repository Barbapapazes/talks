import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import ChatAnimation from '../components/Chat/ChatAnimation.vue'
import { isSlideActive } from './mocks/slidev-client'

const wrappers: ReturnType<typeof mount>[] = []
function animation(options = {}, slots = {}) {
  const wrapper = mount(ChatAnimation, {
    props: {
      userPrompt: 'Plan a feature',
      assistantHtmlFrames: ['A confirmation dialog'],
      followUpPrompt: 'Create an issue',
      followUpHtmlFrames: ['Created issue #42'],
      timingVariance: 0,
      ...options,
    },
    slots: {
      followUpTool: '<div>Tool event</div>',
      ...slots,
    },
  })
  wrappers.push(wrapper)
  return wrapper
}
async function enter() {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', cancelable: true }))
  await nextTick()
}
beforeEach(() => {
  vi.useFakeTimers()
  isSlideActive.value = true
})
afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
  vi.useRealTimers()
})

describe('chat animation', () => {
  it('uses Enter to type and skip, then repeats the shortcut for the follow-up', async () => {
    const wrapper = animation()
    expect(wrapper.get('header').text()).toBe('AI Assistant')
    expect(wrapper.text()).not.toContain('A confirmation dialog')
    await enter()
    await enter()
    expect(wrapper.text()).toContain('A confirmation dialog')
    expect(wrapper.text()).not.toContain('Created issue #42')
    await enter()
    await enter()
    await enter()
    expect(wrapper.text()).toContain('Created issue #42')
    expect(wrapper.text()).toContain('Tool event')
  })

  it('exposes the first tool phase and replaces the default status indicator', async () => {
    const wrapper = animation({}, {
      tool: '<template #tool="{ phase }"><div data-tool-phase>{{ phase }}</div></template>',
    })
    expect(wrapper.get('[data-tool-phase]').text()).toBe('waitingToType')
    await enter()
    await vi.advanceTimersByTimeAsync(1000)
    await enter()
    await vi.advanceTimersByTimeAsync(800)
    expect(wrapper.get('[data-tool-phase]').text()).toBe('searching')
    expect(wrapper.findComponent({ name: 'ChatStatusIndicator' }).exists()).toBe(false)
    await vi.advanceTimersByTimeAsync(3000)
    expect(wrapper.get('[data-tool-phase]').text()).toBe('done')
  })

  it('forwards integration state and header actions', async () => {
    const wrapper = animation({
      integrations: { connected: true, open: false },
    })
    const button = wrapper.get('header button')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('[aria-label="Connected"]').exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.emitted('toggleIntegrations')).toHaveLength(1)
    await wrapper.setProps({
      integrations: { connected: true, open: true },
    })
    expect(button.attributes('aria-expanded')).toBe('true')
  })

  it('waits for Enter to send after typing finishes naturally', async () => {
    const wrapper = animation()
    await enter()
    await vi.advanceTimersByTimeAsync(1000)
    expect(wrapper.find('.assistant-content').exists()).toBe(false)
    await enter()
    await vi.advanceTimersByTimeAsync(4000)
    expect(wrapper.text()).toContain('A confirmation dialog')
  })

  it('does not consume Enter when disabled or on an inactive slide', async () => {
    const wrapper = animation({ enabled: false })
    await enter()
    await enter()
    expect(wrapper.find('.assistant-content').exists()).toBe(false)
    await wrapper.setProps({ enabled: true })
    await enter()
    await enter()
    expect(wrapper.text()).toContain('A confirmation dialog')
    isSlideActive.value = false
    await nextTick()
    await enter()
    expect(wrapper.find('.assistant-content').exists()).toBe(false)
  })

  it('cleans up timers and keyboard handlers when unmounted', async () => {
    const wrapper = animation()
    await enter()
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
    const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true })
    window.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
  })
})
