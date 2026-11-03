import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import ChatInput from '../components/Chat/ChatInput.vue'
import ChatMessage from '../components/Chat/ChatMessage.vue'
import ChatReasoning from '../components/Chat/ChatReasoning.vue'
import ChatToolCall from '../components/Chat/ChatToolCall.vue'
import Bubble from '../components/ui/bubble/Bubble.vue'
import BubbleContent from '../components/ui/bubble/BubbleContent.vue'
import CodeBlock from '../components/ui/code-block/CodeBlock.vue'
import CodeBlockContent from '../components/ui/code-block/CodeBlockContent.vue'
import InputGroup from '../components/ui/input-group/InputGroup.vue'
import InputGroupAddon from '../components/ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '../components/ui/input-group/InputGroupButton.vue'
import Message from '../components/ui/message/Message.vue'
import MessageContent from '../components/ui/message/MessageContent.vue'
import Trace from '../components/ui/trace/Trace.vue'
import TraceCollapsible from '../components/ui/trace/TraceCollapsible.vue'
import TraceCollapsibleContent from '../components/ui/trace/TraceCollapsibleContent.vue'
import TraceCollapsibleTrigger from '../components/ui/trace/TraceCollapsibleTrigger.vue'
import TraceIcon from '../components/ui/trace/TraceIcon.vue'
import TraceLine from '../components/ui/trace/TraceLine.vue'
import TraceTitle from '../components/ui/trace/TraceTitle.vue'

describe('aI Elements message composition', () => {
  it('aligns messages and bubbles without losing caller attributes', () => {
    const message = mount(Message, {
      props: { align: 'end', as: 'article' },
      attrs: { 'class': 'caller-message', 'aria-label': 'User message' },
      slots: { default: 'Hello' },
    })
    expect(message.element.tagName).toBe('ARTICLE')
    expect(message.attributes('data-align')).toBe('end')
    expect(message.attributes('data-slot')).toBe('message')
    expect(message.classes()).toContain('caller-message')
    expect(message.attributes('aria-label')).toBe('User message')
    const bubble = mount(Bubble, {
      props: { variant: 'muted', align: 'end' },
      slots: { default: 'Prompt' },
    })
    expect(bubble.attributes('data-align')).toBe('end')
    expect(bubble.attributes('data-variant')).toBe('muted')
    expect(bubble.text()).toBe('Prompt')
    expect(mount(Message).attributes('data-align')).toBe('start')
    expect(mount(Bubble).attributes('data-variant')).toBe('default')
  })

  it.each([
    { component: MessageContent, slot: 'message-content' },
    { component: BubbleContent, slot: 'bubble-content' },
  ])('preserves composition and custom elements in $slot', ({ component, slot }) => {
    const wrapper = mount(component, {
      props: { asChild: true },
      slots: { default: '<section aria-label="Content">Body</section>' },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.attributes('data-slot')).toBe(slot)
    expect(wrapper.attributes('aria-label')).toBe('Content')
    expect(wrapper.text()).toBe('Body')
  })

  it('uses Message and Bubble for users and leaves assistant HTML rendering intact', () => {
    const user = mount(ChatMessage, { props: { type: 'user', content: 'Prompt' } })
    expect(user.attributes('data-slot')).toBe('message')
    expect(user.attributes('data-align')).toBe('end')
    expect(user.get('[data-slot="message-content"] [data-slot="bubble-content"]').text()).toBe('Prompt')
    expect(user.get('[data-slot="bubble"]').attributes('data-variant')).toBe('muted')
    const assistant = mount(ChatMessage, {
      props: { type: 'assistant', content: '<p><strong>Answer</strong></p>' },
    })
    expect(assistant.attributes('data-align')).toBe('start')
    expect(assistant.find('[data-slot="bubble"]').exists()).toBe(false)
    expect(assistant.get('.assistant-content strong').text()).toBe('Answer')
  })
})

describe('aI Elements prompt input composition', () => {
  it('groups the composer and positions its addons', () => {
    const wrapper = mount(defineComponent({
      components: { InputGroup, InputGroupAddon },
      template: '<InputGroup aria-label="Composer"><InputGroupAddon align="block-start">File</InputGroupAddon><textarea /><InputGroupAddon align="inline-end">Send</InputGroupAddon></InputGroup>',
    }))
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('data-slot')).toBe('input-group')
    expect(wrapper.get('[data-align="block-start"]').text()).toBe('File')
    expect(wrapper.get('[data-align="inline-end"]').text()).toBe('Send')
  })

  it('focuses a field when an addon is clicked, but leaves its controls alone', async () => {
    const wrapper = mount(defineComponent({
      components: { InputGroup, InputGroupAddon },
      template: '<InputGroup><textarea /><InputGroupAddon><span>Hint</span><button>Attach</button></InputGroupAddon></InputGroup>',
    }), { attachTo: document.body })
    try {
      const textarea = wrapper.get('textarea')
      const focus = vi.spyOn(textarea.element, 'focus')
      await wrapper.get('span').trigger('click')
      expect(focus).toHaveBeenCalledOnce()
      expect(document.activeElement).toBe(textarea.element)
      await wrapper.get('button').trigger('click')
      expect(focus).toHaveBeenCalledOnce()
      expect(wrapper.get('[data-slot="input-group-addon"]').attributes('data-align')).toBe('inline-start')
    }
    finally {
      wrapper.unmount()
    }
  })

  it('forwards input group button variants, disabled state, and click handlers', async () => {
    const onClick = vi.fn()
    const wrapper = mount(InputGroupButton, {
      props: { variant: 'default', size: 'icon' },
      attrs: { 'onClick': onClick, 'aria-label': 'Send' },
    })
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('data-slot')).toBe('input-group-button')
    expect(wrapper.attributes('data-variant')).toBe('default')
    expect(wrapper.attributes('data-size')).toBe('icon')
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
    await wrapper.setProps({ disabled: true })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('keeps the scripted field and context slots inside an Input Group', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Explain this', showCursor: true },
      slots: { context: '<button>README.md</button>' },
    })
    expect(wrapper.attributes('data-slot')).toBe('input-group')
    expect(wrapper.attributes('aria-label')).toBe('Message composer')
    expect(wrapper.get('[data-align="block-start"]').text()).toBe('README.md')
    expect(wrapper.get('[data-slot="input-group-button"]').attributes('aria-label')).toBe('Send message')
    expect(wrapper.find('textarea, input').exists()).toBe(false)
    expect(wrapper.find('.chat-cursor').exists()).toBe(true)
  })
})

describe('aI Elements reasoning and tool composition', () => {
  it('renders trace titles, status, and decorative icons', () => {
    const wrapper = mount(defineComponent({
      components: { Trace, TraceLine, TraceIcon, TraceTitle },
      template: '<Trace><TraceLine status="running"><TraceIcon>icon</TraceIcon><TraceTitle>Thinking</TraceTitle></TraceLine></Trace>',
    }))
    expect(wrapper.attributes('data-slot')).toBe('trace')
    expect(wrapper.get('[data-slot="trace-line"]').attributes('data-status')).toBe('running')
    expect(wrapper.get('[data-slot="trace-title"]').text()).toBe('Thinking')
    expect(wrapper.get('[data-slot="trace-icon"]').attributes('aria-hidden')).toBe('true')
  })

  it('connects Trace collapsible controls and forwards open updates', async () => {
    const wrapper = mount(defineComponent({
      components: { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger },
      template: '<TraceCollapsible><TraceCollapsibleTrigger>Details</TraceCollapsibleTrigger><TraceCollapsibleContent>Steps</TraceCollapsibleContent></TraceCollapsible>',
    }))
    const trigger = wrapper.get('button')
    expect(trigger.attributes('data-slot')).toBe('trace-collapsible-trigger')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('[data-slot="trace-collapsible-content-inner"]').text()).toBe('Steps')
    expect(wrapper.get('[data-slot="trace-collapsible-content"]').attributes('id')).toBe(trigger.attributes('aria-controls'))
    await trigger.trigger('click')
    await flushPromises()
    expect(trigger.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('supports custom indicators and controlled disabled traces', async () => {
    const wrapper = mount(defineComponent({
      components: { TraceCollapsible, TraceCollapsibleTrigger },
      template: '<TraceCollapsible :open="true" disabled><TraceCollapsibleTrigger>Details<template #indicator>custom</template></TraceCollapsibleTrigger></TraceCollapsible>',
    }))
    const trigger = wrapper.get('button')
    expect(trigger.text()).toContain('custom')
    expect(trigger.attributes('disabled')).toBeDefined()
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  it('keeps reasoning caller-controlled with Trace content', async () => {
    const wrapper = mount(ChatReasoning, {
      props: { expanded: true },
      slots: { default: '<p>Steps</p>' },
    })
    expect(wrapper.attributes('data-slot')).toBe('trace')
    expect(wrapper.get('[data-slot="trace-title"]').text()).toBe('Reasoning')
    expect(wrapper.get('[data-slot="trace-collapsible-content"] p').text()).toBe('Steps')
    await wrapper.setProps({ expanded: false })
    expect(wrapper.find('[data-slot="trace-collapsible-content"]').exists()).toBe(false)
    await wrapper.setProps({ expanded: true })
    expect(wrapper.get('[data-slot="trace-collapsible-content"] p').text()).toBe('Steps')
    wrapper.unmount()
  })

  it('renders escaped, keyboard-focusable code with optional wrapping', async () => {
    const wrapper = mount(defineComponent({
      components: { CodeBlock, CodeBlockContent },
      template: '<CodeBlock size="sm"><CodeBlockContent wrap>{{ code }}</CodeBlockContent></CodeBlock>',
      setup: () => ({ code: '<script>alert("no")<\/script>\n{}' }),
    }))
    expect(wrapper.attributes('data-size')).toBe('sm')
    const pre = wrapper.get('pre')
    expect(pre.attributes('data-wrap')).toBe('true')
    expect(pre.attributes('tabindex')).toBe('0')
    expect(pre.attributes('dir')).toBe('ltr')
    expect(pre.find('script').exists()).toBe(false)
    expect(pre.get('code').text()).toContain('alert("no")')
    const plain = mount(CodeBlockContent)
    expect(plain.attributes('data-wrap')).toBeUndefined()
  })

  it('highlights JSON with light and dark colors while preserving whitespace and escaping HTML', async () => {
    const code = '{\n  "message": "<img src=x onerror=alert(1)>",\n  "count": 42, "ok": true, "value": null\n}\n'
    const wrapper = mount(CodeBlockContent, { props: { code, language: 'json', wrap: true } })
    expect(wrapper.get('code').element.textContent).toBe(code)
    expect(wrapper.find('img').exists()).toBe(false)
    const tokens = wrapper.findAll('.syntax-token[style]')
    expect(tokens.length).toBeGreaterThan(5)
    expect(tokens.some(token => token.attributes('style')?.includes('--shiki-light:'))).toBe(true)
    expect(tokens.some(token => token.attributes('style')?.includes('--shiki-dark:'))).toBe(true)
    expect(new Set(tokens.map(token => token.attributes('style'))).size).toBeGreaterThan(2)

    await wrapper.setProps({ code: 'Tool returned <b>plain text</b>' })
    expect(wrapper.find('.syntax-token').exists()).toBe(false)
    expect(wrapper.get('code').text()).toBe('Tool returned <b>plain text</b>')
    expect(wrapper.find('b').exists()).toBe(false)
    await wrapper.setProps({ code: '' })
    expect(wrapper.get('code').text()).toBe('')
  })

  it('highlights tool input and completed output, including prop updates', async () => {
    const wrapper = mount(ChatToolCall, {
      props: { name: 'search', arguments: '{"query":"Vue"}', result: '{"count":1}', status: 'running' },
    })
    expect(wrapper.get('code .syntax-token').exists()).toBe(true)
    expect(wrapper.findAll('code')).toHaveLength(1)
    await wrapper.setProps({ status: 'completed' })
    expect(wrapper.findAll('code')).toHaveLength(2)
    expect(wrapper.findAll('code')[1]!.find('.syntax-token').exists()).toBe(true)
    await wrapper.setProps({ result: '{"count":2}' })
    expect(wrapper.findAll('code')[1]!.text()).toBe('{"count":2}')
    wrapper.unmount()
  })

  it('uses Trace and Code Block without exposing tool results before completion', async () => {
    const wrapper = mount(ChatToolCall, {
      props: { name: 'get_time', status: 'running', arguments: '{}', result: '14:32' },
    })
    expect(wrapper.attributes('data-slot')).toBe('trace')
    expect(wrapper.get('[data-slot="trace-line"]').attributes('data-status')).toBe('running')
    expect(wrapper.findAll('[data-slot="code-block"]')).toHaveLength(1)
    expect(wrapper.text()).not.toContain('14:32')
    await wrapper.setProps({ status: 'completed' })
    expect(wrapper.get('[data-slot="trace-line"]').attributes('data-status')).toBeUndefined()
    expect(wrapper.findAll('[data-slot="code-block"]')).toHaveLength(2)
    expect(wrapper.findAll('pre')[1]!.text()).toBe('14:32')
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })
})
