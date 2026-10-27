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

  it('supports caller-controlled header actions and a footer', () => {
    const wrapper = mount(ChatWindow, {
      props: { status: 'Hidden status' },
      slots: { actions: '<button>Integrations</button>', footer: '<form>Send a message</form>' },
    })
    expect(wrapper.get('header button').text()).toBe('Integrations')
    expect(wrapper.text()).not.toContain('Hidden status')
    expect(wrapper.get('form').text()).toBe('Send a message')
  })

  it('shows a compact tool event without arguments or results', async () => {
    const wrapper = mount(ChatToolCall, {
      props: {
        name: 'create_issue',
        compact: true,
        status: 'running',
        arguments: 'secret arguments',
        result: 'secret result',
      },
    })
    expect(wrapper.text()).toContain('create_issue')
    expect(wrapper.get('[role="status"]').classes()).toContain('sr-only')
    expect(wrapper.find('.i-ph-spinner-gap.animate-spin').exists()).toBe(true)
    expect(wrapper.find('.i-ph-wrench').exists()).toBe(false)
    expect(wrapper.find('pre').exists()).toBe(false)
    await wrapper.setProps({ status: 'completed' })
    expect(wrapper.get('[role="status"]').text()).toBe('Completed')
    expect(wrapper.find('.animate-spin').exists()).toBe(false)
    expect(wrapper.find('.i-ph-wrench').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('secret')
    const toggle = wrapper.get('button')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Input')
    expect(wrapper.text()).toContain('secret arguments')
    expect(wrapper.text()).toContain('Output')
    expect(wrapper.text()).toContain('secret result')
    await toggle.trigger('click')
    expect(wrapper.find('pre').exists()).toBe(false)
    await wrapper.setProps({ status: 'running' })
    await toggle.trigger('click')
    expect(wrapper.text()).toContain('secret arguments')
    expect(wrapper.text()).not.toContain('secret result')
  })

  it('distinguishes a model request from application execution and result', async () => {
    const wrapper = mount(ChatToolCall, {
      props: {
        name: 'get_time',
        arguments: '{"city": "Paris"}',
        result: '{"time": "14:32"}',
      },
    })

    expect(wrapper.get('[role="status"]').text()).toBe('Requested')
    expect(wrapper.text()).toContain('{"city": "Paris"}')
    expect(wrapper.text()).not.toContain('14:32')
    await wrapper.setProps({ status: 'running' })
    expect(wrapper.get('[role="status"]').text()).toBe('Running')
    expect(wrapper.text()).not.toContain('14:32')
    await wrapper.setProps({ status: 'completed' })
    expect(wrapper.get('[role="status"]').text()).toBe('Completed')
    expect(wrapper.text()).toContain('Output')
    expect(wrapper.text()).toContain('14:32')
    await wrapper.setProps({ status: 'requested' })
    expect(wrapper.text()).not.toContain('14:32')
  })
})
