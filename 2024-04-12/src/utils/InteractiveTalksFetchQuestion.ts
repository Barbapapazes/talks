import { ofetch } from 'ofetch'
import type { Question } from '../types'

export async function fetchQuestion<T = Question>(questionUrl: string, token: string) {
  return ofetch<T>(questionUrl, {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  })
}
