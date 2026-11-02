import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import MessageLog from '../components/MessageLog.vue'

const items = [
  { id: 'request', label: 'initialize', revealAt: 0, actionLabel: 'View message' },
  { id: 'response', label: 'initialize result', revealAt: 1, actionLabel: 'View message' },
  { id: 'notification', label: 'notifications/initialized', revealAt: 2, actionLabel: 'View message' },
]

function render(step = 0) {
  return mount(MessageLog, {
    props: { title: 'Connection log', items, step },
    slots: { default: ({ item }: { item: typeof items[number] }) => h('span', item.label) },
  })
}

describe('message log', () => {
  it('reveals messages progressively without mounting future actions', async () => {
    const wrapper = render()
    expect(wrapper.attributes('aria-label')).toBe('Connection log')
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.findAll('button')).toHaveLength(1)
    expect(wrapper.text()).not.toContain('initialize result')
    expect(wrapper.emitted('select')).toBeUndefined()

    await wrapper.setProps({ step: 1 })
    expect(wrapper.findAll('li')).toHaveLength(2)
    await wrapper.setProps({ step: 2 })
    expect(wrapper.findAll('li')).toHaveLength(3)
    expect(wrapper.emitted('select')).toBeUndefined()

    await wrapper.setProps({ step: 0 })
    expect(wrapper.findAll('button')).toHaveLength(1)
    expect(wrapper.text()).not.toContain('notifications/initialized')
  })

  it('emits the selected entry and lets the presenter revisit older entries', async () => {
    const wrapper = render(2)
    await wrapper.findAll('button')[2].trigger('click')
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('select')).toEqual([[items[2]], [items[0]]])
  })

  it('supports entries without actions or reveal steps and an empty log', async () => {
    const wrapper = mount(MessageLog, {
      props: { title: 'HTTP logs', items: [{ id: 'plain', label: 'GET /' }] },
      slots: { default: ({ item }: { item: { label: string } }) => item.label },
    })
    expect(wrapper.text()).toContain('GET /')
    expect(wrapper.find('button').exists()).toBe(false)
    await wrapper.setProps({ items: [] })
    expect(wrapper.findAll('li')).toHaveLength(0)
    expect(wrapper.text()).toBe('HTTP logs')
  })

  it('isolates clicks and button activation while allowing navigation keys', async () => {
    const onClick = vi.fn()
    const onKeydown = vi.fn()
    const wrapper = mount(defineComponent({
      setup: () => () => h('div', { onClick, onKeydown }, [
        h(MessageLog, { title: 'Connection log', items }, { default: () => 'Message' }),
      ]),
    }))
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('keydown', { key: 'Enter' })
    await wrapper.get('section').trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    expect(onKeydown).not.toHaveBeenCalled()
    await wrapper.get('button').trigger('keydown', { key: 'ArrowRight' })
    expect(onKeydown).toHaveBeenCalledOnce()
  })

  it('keeps row identity when earlier entries are removed', async () => {
    const wrapper = render(2)
    const responseButton = wrapper.findAll('button')[1].element
    await wrapper.setProps({ items: items.slice(1) })
    expect(wrapper.findAll('button')[0].element).toBe(responseButton)
  })
})
