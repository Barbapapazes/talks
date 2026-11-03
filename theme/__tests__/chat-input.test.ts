import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatInput from '../components/Chat/ChatInput.vue'

describe('chat input', () => {
  it('keeps the composer simulated and labels its send control', () => {
    const wrapper = mount(ChatInput, { props: { value: 'Hello', showCursor: true } })
    expect(wrapper.find('textarea, input, [contenteditable]').exists()).toBe(false)
    expect(wrapper.get('button').attributes('aria-label')).toBe('Send message')
    expect(wrapper.get('button').attributes('type')).toBe('button')
    expect(wrapper.find('.chat-cursor').exists()).toBe(true)
  })

  it('hides the cursor and shows a placeholder when disabled', () => {
    const wrapper = mount(ChatInput, { props: { disabled: true, showCursor: true } })
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.chat-cursor').exists()).toBe(false)
    expect(wrapper.text()).toContain('Type your message...')
  })

  it('keeps custom message content instead of simulated text', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hidden prompt' },
      slots: { message: '<span>Custom prompt</span>' },
    })
    expect(wrapper.text()).toContain('Custom prompt')
    expect(wrapper.text()).not.toContain('Hidden prompt')
  })

  it('uses the shared composer style without context', () => {
    const wrapper = mount(ChatInput, { props: { value: 'Hello' } })
    expect(wrapper.classes()).toContain('chat-input')
    expect(wrapper.classes()).not.toContain('rounded-full')
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders context above the message in a multiline composer', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Explain this project', disabled: true },
      slots: { context: '<button>Add context</button><span>README.md</span>' },
    })
    expect(wrapper.classes()).toContain('chat-input')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.text()).toContain('README.md')
    expect(wrapper.findAll('button')[0]!.attributes('disabled')).toBeUndefined()
    expect(wrapper.findAll('button')[1]!.attributes('disabled')).toBeDefined()
  })
})
