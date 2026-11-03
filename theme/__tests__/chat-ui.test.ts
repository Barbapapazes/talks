import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'
import ChatReasoning from '../components/Chat/ChatReasoning.vue'
import ChatStatusIndicator from '../components/Chat/ChatStatusIndicator.vue'
import Badge from '../components/ui/badge/Badge.vue'
import Button from '../components/ui/button/Button.vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible'

describe('chat UI components', () => {
  it('renders a safe button with variant, size, and caller attributes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'outline', size: 'icon' },
      attrs: { 'aria-label': 'Attach a file', 'class': 'caller-class' },
      slots: { default: '+' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('aria-label')).toBe('Attach a file')
    expect(wrapper.attributes('data-variant')).toBe('outline')
    expect(wrapper.attributes('data-size')).toBe('icon')
    expect(wrapper.classes()).toContain('caller-class')
    expect(wrapper.text()).toBe('+')
  })

  it('forwards disabled state and uses neutral defaults', () => {
    const wrapper = mount(Button, { attrs: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('data-variant')).toBe('default')
    expect(wrapper.attributes('data-size')).toBe('default')
  })

  it('supports Primitive composition without nesting a second button', () => {
    const wrapper = mount(Button, {
      props: { asChild: true, variant: 'ghost' },
      slots: { default: '<a href="#details">Details</a>' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('#details')
    expect(wrapper.attributes('type')).toBeUndefined()
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders inline badges and forwards live status semantics', () => {
    const wrapper = mount(Badge, {
      props: { variant: 'secondary' },
      attrs: { role: 'status' },
      slots: { default: 'Running' },
    })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.attributes('data-variant')).toBe('secondary')
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.text()).toBe('Running')
    expect(mount(Badge).attributes('data-variant')).toBe('default')
  })

  it('connects a collapsible trigger to its content and toggles state', async () => {
    const wrapper = mount(defineComponent({
      components: { Collapsible, CollapsibleContent, CollapsibleTrigger, Button },
      template: `<Collapsible>
        <CollapsibleTrigger as-child><Button>Details</Button></CollapsibleTrigger>
        <CollapsibleContent><pre>Tool output</pre></CollapsibleContent>
      </Collapsible>`,
    }))
    const button = wrapper.get('button')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('pre').exists()).toBe(false)
    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('pre').text()).toBe('Tool output')
    expect(wrapper.get(`[id="${button.attributes('aria-controls')}"]`).exists()).toBe(true)
    wrapper.unmount()
  })

  it('keeps reasoning expansion controlled by the caller', async () => {
    const wrapper = mount(ChatReasoning, {
      props: { expanded: false },
      slots: { default: 'Private reasoning' },
    })
    const button = wrapper.get('button')
    expect(button.attributes('aria-expanded')).toBe('false')
    await button.trigger('click')
    expect(wrapper.emitted('update:expanded')).toEqual([[true]])
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).not.toContain('Private reasoning')
    await wrapper.setProps({ expanded: true })
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Private reasoning')
    wrapper.unmount()
  })

  it('lets a caller bind reasoning expansion with v-model', async () => {
    const wrapper = mount(defineComponent({
      components: { ChatReasoning },
      setup: () => ({ expanded: ref(true) }),
      template: '<ChatReasoning v-model:expanded="expanded">Steps</ChatReasoning>',
    }))
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).not.toContain('Steps')
    wrapper.unmount()
  })

  it('announces search and thinking states without reading decorative dots', async () => {
    const wrapper = mount(ChatStatusIndicator, { props: { status: 'searching' } })
    expect(wrapper.get('[role="status"]').text()).toBe('Searching...')
    expect(wrapper.get('.spinner').attributes('aria-hidden')).toBe('true')
    await wrapper.setProps({ status: 'thinking' })
    expect(wrapper.get('.thinking-dots').attributes('aria-hidden')).toBe('true')
    expect(wrapper.text()).toContain('Thinking...')
    expect(wrapper.find('.spinner').exists()).toBe(false)
  })
})
