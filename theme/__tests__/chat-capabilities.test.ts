import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatReasoning from '../components/Chat/ChatReasoning.vue'
import ChatToolCall from '../components/Chat/ChatToolCall.vue'
import ChatWindow from '../components/Chat/ChatWindow.vue'

describe('chat capability components', () => {
  it('renders a neutral chat with caller-controlled status and messages', () => {
    const wrapper = mount(ChatWindow, {
      props: { status: 'Model call · completed' },
      slots: { default: '<div>A message</div>' },
    })

    expect(wrapper.get('header').text()).toContain('Chat')
    expect(wrapper.get('[role="status"]').text()).toBe('Model call · completed')
    expect(wrapper.text()).toContain('A message')
    expect(wrapper.html()).not.toContain('openai')
  })

  it('renders a fullscreen chat without a header status by default', () => {
    const wrapper = mount(ChatWindow, {
      props: { fullscreen: true },
    })

    expect(wrapper.classes()).toContain('chat-window-fullscreen')
    expect(wrapper.find('[role="status"]').exists()).toBe(false)
    expect(wrapper.get('header').text()).toBe('Chat')
  })

  it('collapses reasoning without hiding its label', async () => {
    const wrapper = mount(ChatReasoning, {
      props: { expanded: true },
      slots: { default: '<div>2x = 1</div>' },
    })

    expect(wrapper.text()).toContain('2x = 1')
    expect(wrapper.text()).not.toContain('Illustrative reasoning')
    await wrapper.setProps({ expanded: false })
    expect(wrapper.text()).not.toContain('2x = 1')
    expect(wrapper.text()).toContain('Reasoning')
    await wrapper.setProps({ expanded: true })
    expect(wrapper.text()).toContain('2x = 1')
  })

  it('distinguishes a model request from application execution and result', async () => {
    const wrapper = mount(ChatToolCall, {
      props: {
        name: 'get_time',
        arguments: '{"city": "Paris"}',
        result: '{"time": "14:32"}',
      },
    })

    expect(wrapper.text()).toContain('Requested by model')
    expect(wrapper.text()).toContain('{"city": "Paris"}')
    expect(wrapper.text()).not.toContain('14:32')
    await wrapper.setProps({ status: 'running' })
    expect(wrapper.text()).toContain('Running in application')
    expect(wrapper.text()).not.toContain('14:32')
    await wrapper.setProps({ status: 'completed' })
    expect(wrapper.text()).toContain('Completed by application')
    expect(wrapper.text()).toContain('Tool result')
    expect(wrapper.text()).toContain('14:32')
    await wrapper.setProps({ status: 'requested' })
    expect(wrapper.text()).not.toContain('14:32')
  })
})
