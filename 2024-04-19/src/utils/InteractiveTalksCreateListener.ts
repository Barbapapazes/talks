import { Transmit } from '@adonisjs/transmit-client'

export function createListener(baseUrl: string, token: string) {
  const transmit = new Transmit({
    baseUrl,
    beforeSubscribe: (req: Request) => {
      req.headers.append('authorization', `Bearer ${token}`)
    },
  })

  return transmit
}
