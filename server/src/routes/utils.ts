import { headers } from '../constants'

export const response = <T>(status: number, payload: T) =>
  new Response(JSON.stringify(payload), {
    headers,
    status,
  })
