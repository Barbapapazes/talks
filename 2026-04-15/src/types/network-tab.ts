export interface Request {
  id: number
  name: string
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
}
