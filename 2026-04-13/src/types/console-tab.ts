export interface ConsoleEntry {
  id: number
  level: 'error' | 'warn' | 'info' | 'log'
  message: string
  source?: string
  details?: string
}
