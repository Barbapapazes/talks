import type { RpcExchange } from '../types/inspect'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Inspect from '../components/Inspect/Inspect.vue'
import InspectJson from '../components/Inspect/InspectJson.vue'
import InspectRpc from '../components/Inspect/InspectRpc.vue'
import InspectTabs from '../components/Inspect/InspectTabs.vue'

const exchanges: RpcExchange[] = [
  {
    id: 'list',
    method: 'tools/list',
    request: { jsonrpc: '2.0', id: 1, method: 'tools/list' },
    response: {
      jsonrpc: '2.0',
      id: 1,
      result: { tools: [] },
    },
  },
  {
    id: 'call',
    method: 'tools/call',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: { name: 'create_issue' },
    },
    response: {
      jsonrpc: '2.0',
      id: 2,
      result: {
        content: [
          { type: 'text', text: 'Created issue #42.' },
        ],
      },
    },
    requestNote: 'The app sends the call.',
    responseNote: 'The app passes the result to the model.',
    highlightFields: ['name'],
  },
]

function tab(wrapper: ReturnType<typeof mount>, name: string) {
  return wrapper.findAll('[role="tab"]').find(button => button.text() === name)!
}

describe('inspector frame', () => {
  it('renders the shared frame with optional header and filters', () => {
    const wrapper = mount(Inspect, {
      slots: { header: 'Inspector', filters: 'Filters', default: 'Content' },
    })
    expect(wrapper.text()).toContain('Inspector')
    expect(wrapper.text()).toContain('Filters')
    expect(wrapper.text()).toContain('Content')
    expect(wrapper.classes()).toContain('not-content')
  })
})

describe('inspector tabs', () => {
  it('renders tab state and emits only enabled selections', async () => {
    const wrapper = mount(InspectTabs, {
      props: {
        items: [
          { name: 'Headers', disabled: true },
          { name: 'Request', active: true },
          { name: 'Response' },
        ],
      },
    })
    expect(tab(wrapper, 'Headers').attributes('disabled')).toBeDefined()
    expect(tab(wrapper, 'Request').attributes('aria-selected')).toBe('true')
    await tab(wrapper, 'Headers').trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    await tab(wrapper, 'Response').trigger('click')
    expect(wrapper.emitted('select')).toEqual([
      ['Response'],
    ])
  })
})

describe('inspector JSON', () => {
  it('preserves the full JSON while highlighting fields and token types', () => {
    const value = {
      name: 'create_issue',
      count: -1.5,
      enabled: true,
      missing: null,
      escaped: 'quote: "hello"\nnext',
    }
    const wrapper = mount(InspectJson, {
      props: {
        value,
        highlightFields: ['name'],
      },
    })
    expect(wrapper.get('code').element.textContent).toBe(JSON.stringify(value, null, 2))
    expect(wrapper.get('.json-highlight').text()).toContain('"name"')
    expect(wrapper.findAll('.json-key')).toHaveLength(5)
    expect(wrapper.findAll('.json-literal').map(item => item.text())).toEqual(['-1.5', 'true', 'null'])
  })

  it('compacts arrays of objects without changing their JSON values', () => {
    const value = {
      contents: [
        { uri: 'docs://brief', text: 'A brief' },
      ],
    }
    const wrapper = mount(InspectJson, {
      props: { value },
    })
    const json = wrapper.get('code').element.textContent!
    expect(json).toContain('[{')
    expect(JSON.parse(json)).toEqual(value)
  })

  it('never interprets server content as HTML', () => {
    const wrapper = mount(InspectJson, {
      props: {
        value: { text: '<img src=x onerror=alert(1)>' },
      },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('<img src=x onerror=alert(1)>')
  })
})

describe('rPC inspector', () => {
  it('opens the selected main call, with readable method names and request direction', () => {
    const wrapper = mount(InspectRpc, {
      props: { exchanges, selectedId: 'call' },
    })
    expect(wrapper.get('[aria-pressed="true"]').text()).toBe('tools/call')
    expect(wrapper.get('.rpc-direction').text()).toContain('Client → server')
    expect(wrapper.get('code').text()).toContain('create_issue')
    expect(wrapper.get('.rpc-note').text()).toBe('The app sends the call.')
  })

  it('switches between request and response with manual tabs', async () => {
    const wrapper = mount(InspectRpc, {
      props: { exchanges, selectedId: 'call' },
    })
    await tab(wrapper, 'Response').trigger('click')
    expect(tab(wrapper, 'Response').attributes('aria-selected')).toBe('true')
    expect(wrapper.get('.rpc-direction').text()).toContain('Server → client')
    expect(wrapper.get('code').text()).toContain('Created issue #42.')
    expect(wrapper.get('.rpc-note').text()).toBe('The app passes the result to the model.')
    await tab(wrapper, 'Request').trigger('click')
    expect(tab(wrapper, 'Request').attributes('aria-selected')).toBe('true')
  })

  it('opens discovery on selection and resets to the request', async () => {
    const wrapper = mount(InspectRpc, {
      props: { exchanges, selectedId: 'call' },
    })
    await tab(wrapper, 'Response').trigger('click')
    await wrapper.get('.rpc-call').trigger('click')
    expect(wrapper.get('[aria-pressed="true"]').text()).toBe('tools/list')
    expect(tab(wrapper, 'Request').attributes('aria-selected')).toBe('true')
    await wrapper.setProps({ selectedId: 'list' })
    await wrapper.setProps({ selectedId: 'call' })
    expect(wrapper.get('[aria-pressed="true"]').text()).toBe('tools/call')
  })

  it('handles missing selections, notifications, and an empty list', async () => {
    const wrapper = mount(InspectRpc, {
      props: { exchanges, selectedId: 'missing' },
    })
    expect(wrapper.get('[aria-pressed="true"]').text()).toBe('tools/list')
    await wrapper.setProps({
      exchanges: [
        {
          id: 'notification',
          method: 'notifications/initialized',
          request: { jsonrpc: '2.0', method: 'notifications/initialized' },
        },
      ],
    })
    expect(tab(wrapper, 'Response').attributes('disabled')).toBeDefined()
    expect(tab(wrapper, 'Request').attributes('aria-selected')).toBe('true')
    expect(wrapper.get('.rpc-direction').text()).not.toContain('id:')
    await wrapper.setProps({ exchanges: [] })
    expect(wrapper.text()).toContain('No calls to inspect.')
  })
})
