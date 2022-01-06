import { IttyRequest } from '../types'
import { response } from '../routes/utils'

declare const USERS: KVNamespace

export interface KVAuth {
  user: string
}

/**
 * parse http bearer token authorization value from header
 */
export const withAuth = async (request: IttyRequest) => {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader) {
      return response(401, {
        messages: [
          'no authorization header provided (Bearer token auth required for this route)',
        ],
      })
    }

    const [scheme, token] = authHeader.split(' ')

    // The Authorization header must start with "Bearer", followed by a space.
    if (!token || !scheme || scheme !== 'Bearer') {
      return response(401, { messages: ['malformed authorization header'] })
    }

    const serialisedAuth = await USERS.get(token)
    if (!serialisedAuth) {
      return response(403, { messages: ['forbidden access'] })
    }

    request.auth = {
      user: JSON.parse(serialisedAuth),
    }
  } catch (e) {
    console.error(e)
    return response(500, {
      messages: ['something went wrong authorizing this token'],
    })
  }
}
