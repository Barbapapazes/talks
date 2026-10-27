import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatInput from '../components/Chat/ChatInput.vue'

describe('chat input', () => {
  it('keeps the original rounded input without context', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello' },
    })
    expect(wrapper.classes()).toContain('rounded-full')
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders context above the message in a multiline composer', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Explain this project', disabled: true },
      slots: { context: '<button>Add context</button><span>README.md</span>' },
    })
    expect(wrapper.classes()).toContain('rounded-xl')
    expect(wrapper.text()).toContain('README.md')
    expect(wrapper.findAll('button')[0]!.attributes('disabled')).toBeUndefined()
    expect(wrapper.findAll('button')[1]!.attributes('disabled')).toBeDefined()
  })
})
