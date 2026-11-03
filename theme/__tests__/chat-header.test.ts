import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatHeader from '../components/Chat/ChatHeader.vue'
import headerSource from '../components/Chat/ChatHeader.vue?raw'
import buttonSource from '../components/ui/button/Button.vue?raw'

describe('chat header', () => {
  it('reserves the small button height even without optional controls', () => {
    const buttonHeight = buttonSource.match(/\[data-size='sm'\]\s*\{\s*height:\s*(\d+px)/)?.[1]
    expect(buttonHeight).toBeDefined()
    expect(headerSource).toMatch(new RegExp(`\\.chat-label\\s*\\{\\s*min-height: ${buttonHeight};`))
  })

  it('uses the same assistant name and OpenAI logo without optional controls', () => {
    const wrapper = mount(ChatHeader)
    expect(wrapper.text()).toBe('AI Assistant')
    expect(wrapper.find('.i-logos-openai-icon').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('shows integration state and emits the toggle action', async () => {
    const wrapper = mount(ChatHeader, { props: { integrations: { connected: false, open: false } } })
    const button = wrapper.get('button')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('[aria-label="Connected"]').exists()).toBe(false)
    await button.trigger('click')
    expect(wrapper.emitted('toggleIntegrations')).toHaveLength(1)
    await wrapper.setProps({ integrations: { connected: true, open: true } })
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('[aria-label="Connected"]').exists()).toBe(true)
  })
})
