// Fictional peers using the MCP 2026-07-28 specification.
// https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta
export const protocolVersion = '2026-07-28'

export const clientMetadata = {
  'io.modelcontextprotocol/protocolVersion': protocolVersion,
  'io.modelcontextprotocol/clientInfo': { name: 'project-chat', version: '1.0.0' },
  'io.modelcontextprotocol/clientCapabilities': {},
}

export const serverMetadata = {
  'io.modelcontextprotocol/serverInfo': { name: 'github-mcp', version: '1.0.0' },
}

export function mcpRequest(method: string, id: number, params: Record<string, unknown> = {}) {
  return { jsonrpc: '2.0', id, method, params: { ...params, _meta: clientMetadata } }
}

export function mcpResult(id: number, result: Record<string, unknown>) {
  return { jsonrpc: '2.0', id, result: { resultType: 'complete', ...result, _meta: serverMetadata } }
}
