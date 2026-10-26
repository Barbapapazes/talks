import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import McpProtocolInspector from '../components/McpProtocolInspector.vue'
import { mcpExchanges } from '../data/mcp-exchanges'
import { mcpResources } from '../data/mcp-resources'

describe('mCP protocol slides', () => {
  it.each([
    ['tools', 'tools/call', 'create_issue'],
    ['resources', 'resources/read', 'docs://project-dashboard/project-brief'],
    ['prompts', 'prompts/get', 'review_pull_request'],
  ] as const)('opens the main %s call and reveals its response', async (kind, method, content) => {
    const wrapper = mount(McpProtocolInspector, { props: { kind } })
    expect(wrapper.get('[aria-pressed="true"]').text()).toBe(method)
    expect(wrapper.get('code').text()).toContain(content)
    expect(wrapper.findAll('.rpc-call').map(button => button.text())).toEqual(mcpExchanges[kind].map(item => item.method))
    await wrapper.get('[role="tab"][aria-selected="false"]').trigger('click')
    const payload = JSON.parse(wrapper.get('code').element.textContent!)
    expect(payload).toEqual(mcpExchanges[kind][1].response)
    expect(wrapper.get('.rpc-direction').text()).toContain('Server → client')
    await wrapper.get('[role="tab"][aria-selected="false"]').trigger('click')
    expect(wrapper.get('.rpc-direction').text()).toContain('Client → server')
  })

  it('lists every resource offered in the chat context picker', async () => {
    const wrapper = mount(McpProtocolInspector, { props: { kind: 'resources' } })
    await wrapper.get('.rpc-call').trigger('click')
    await wrapper.get('[role="tab"][aria-selected="false"]').trigger('click')
    const payload = JSON.parse(wrapper.get('code').element.textContent!)
    expect(payload.result.resources).toEqual(mcpResources.map(({ icon: _icon, ...resource }) => resource))
    expect(payload.result.resources.map((resource: { name: string }) => resource.name)).toEqual([
      'Project brief',
      'Project deletion policy',
      'Customer feedback',
    ])
    expect(payload.result.resources.every((resource: { uri: string }) => resource.uri.startsWith('docs://project-dashboard/'))).toBe(true)
  })

  it('uses consistent JSON-RPC IDs and retains the demo data', () => {
    for (const exchange of Object.values(mcpExchanges).flat()) {
      expect(exchange.request.jsonrpc).toBe('2.0')
      expect(exchange.request.method).toBe(exchange.method)
      expect(exchange.response?.id).toBe(exchange.request.id)
      expect(exchange.response?.jsonrpc).toBe('2.0')
    }
    const toolResult = mcpExchanges.tools[1].response!.result as { content: { text: string }[] }
    expect(toolResult.content[0].text).toContain('Created issue #42')
    expect(mcpExchanges.prompts[1].request.params).toMatchObject({ arguments: { pull_request: '17' } })
  })
})
