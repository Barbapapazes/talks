// Discovery is optional for clients. It does not establish a protocol session.
// https://modelcontextprotocol.io/specification/2026-07-28/server/discover
import { mcpRequest, mcpResult, protocolVersion } from './mcp-protocol'

export const discoveryMessages = [
  {
    id: 'discover-request',
    label: 'server/discover',
    direction: 'Client → server',
    revealAt: 0,
    actionLabel: 'View message',
    payload: mcpRequest('server/discover', 0),
  },
  {
    id: 'discover-response',
    label: 'Supported versions and capabilities',
    direction: 'Server → client',
    revealAt: 1,
    actionLabel: 'View message',
    payload: mcpResult(0, {
      supportedVersions: [protocolVersion],
      capabilities: { tools: {}, resources: {}, prompts: {} },
      ttlMs: 300000,
      cacheScope: 'public',
    }),
  },
]
