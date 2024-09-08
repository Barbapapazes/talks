import { ofetch } from 'ofetch'

export async function fetchAnswers<T>(answersUrl: string, token: string) {
  return ofetch<T[]>(answersUrl, {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  })
}
