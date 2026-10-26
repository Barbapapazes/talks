import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import McpAppsDemo from '../../ai-for-everyone/the-mcp-server/src/components/McpAppsDemo.vue'
import { isSlideActive } from './mocks/slidev-client'

const wrappers: ReturnType<typeof mount>[] = []

async function showApp() {
  const wrapper = mount(McpAppsDemo)
  wrappers.push(wrapper)
  for (let i = 0; i < 2; i++) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }))
    await nextTick()
  }
  return wrapper
}

beforeEach(() => {
  vi.useFakeTimers()
  isSlideActive.value = true
})
afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
  vi.useRealTimers()
})

describe('mCP Apps demo', () => {
  it('shows the tool, filters issues, and opens issue #42', async () => {
    const wrapper = await showApp()
    expect(wrapper.text()).toContain('list_issues')
    expect(wrapper.findAll('.issue-row')).toHaveLength(3)
    await wrapper.get('select').setValue('enhancement')
    expect(wrapper.findAll('.issue-row')).toHaveLength(2)
    expect(wrapper.text()).not.toContain('Fix sidebar overflow')
    await wrapper.get('.issue-row').trigger('click')
    expect(wrapper.get('.issue-detail').text()).toContain('type the project’s name')
    await wrapper.get('.back-button').trigger('click')
    expect(wrapper.findAll('.issue-row')).toHaveLength(2)
  })

  it('resets the filter and selection when revisiting the slide', async () => {
    const wrapper = await showApp()
    await wrapper.get('select').setValue('bug')
    await wrapper.get('.issue-row').trigger('click')
    isSlideActive.value = false
    await nextTick()
    isSlideActive.value = true
    await nextTick()
    for (let i = 0; i < 2; i++) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      await nextTick()
    }
    expect(wrapper.find('.issue-detail').exists()).toBe(false)
    expect(wrapper.get('select').element.value).toBe('all')
    expect(wrapper.findAll('.issue-row')).toHaveLength(3)
  })

  it('keeps keyboard interactions inside the app', async () => {
    const wrapper = await showApp()
    const listener = vi.fn()
    window.addEventListener('keydown', listener)
    try {
      await wrapper.get('select').trigger('keydown', { key: 'Enter' })
      expect(listener).not.toHaveBeenCalled()
    }
    finally {
      window.removeEventListener('keydown', listener)
    }
  })
})
