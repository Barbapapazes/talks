import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import ChatMessage from '../components/Chat/ChatMessage.vue'

describe('chat assistant messages', () => {
  it('keeps rendering existing HTML responses', () => {
    const wrapper = mount(ChatMessage, {
      props: { type: 'assistant', content: '<strong>Existing response</strong>' },
    })

    expect(wrapper.find('strong').text()).toBe('Existing response')
  })

  it('renders Vue content instead of HTML when given a slot', () => {
    const wrapper = mount(ChatMessage, {
      props: { type: 'assistant', content: '<strong>Old response</strong>' },
      slots: { default: () => h('button', 'Vue component') },
    })

    expect(wrapper.find('button').text()).toBe('Vue component')
    expect(wrapper.find('strong').exists()).toBe(false)
  })
})
