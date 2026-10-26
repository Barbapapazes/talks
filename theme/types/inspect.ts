export interface RpcExchange {
  /** Stable inspector row ID, separate from the JSON-RPC request ID. */
  id: string
  method: string
  request: Record<string, unknown>
  response?: Record<string, unknown>
  requestNote?: string
  responseNote?: string
  highlightFields?: string[]
}
