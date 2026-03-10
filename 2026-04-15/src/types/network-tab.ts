export interface WebSocketMessage {
  id: number
  direction: 'sent' | 'received'
  payload: string
  time?: string
  type?: 'text' | 'ping' | 'pong'
}

export interface Request {
  id: number
  name: string
  url?: string
  type: string
  method?: string
  status?: number
  protocol?: string
  initiator?: string
  size?: string
  time: number
  response?: string
  waterfallStart?: number
  waterfallDuration?: number
  webSocketMessages?: WebSocketMessage[]
}
