// Minimal fictional peers, using the MCP 2025-11-25 lifecycle specification.
// https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle
const initialization = {
  request: {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-11-25',
      capabilities: {},
      clientInfo: { name: 'project-chat', version: '1.0.0' },
    },
  },
  response: {
    jsonrpc: '2.0',
    id: 1,
    result: {
      protocolVersion: '2025-11-25',
      capabilities: { tools: {} },
      serverInfo: { name: 'github-mcp', version: '1.0.0' },
    },
  },
  notification: {
    jsonrpc: '2.0',
    method: 'notifications/initialized',
  },
}

export const initializationMessages = [
  {
    id: 'initialize-request',
    label: 'initialize',
    direction: 'Client → server',
    revealAt: 0,
    actionLabel: 'View message',
    payload: initialization.request,
  },
  {
    id: 'initialize-response',
    label: 'initialize result',
    direction: 'Server → client',
    revealAt: 1,
    actionLabel: 'View message',
    payload: initialization.response,
  },
  {
    id: 'initialized-notification',
    label: 'notifications/initialized',
    direction: 'Client → server',
    revealAt: 2,
    actionLabel: 'View message',
    payload: initialization.notification,
  },
]
