import { IttyRequest } from '../types'
import { contain } from '../utils'
import { createParty, PartyCreate } from '../database/create-party'
import { response } from './utils'

/**
 * Creates a new political party which can be endorsed
 */
export const addParty = async (request: IttyRequest) => {
  const { faunaClient } = request

  if (!request.json) {
    return response(400, { messages: ['no request payload provided'] })
  }

  const payload: PartyCreate = await request.json()

  const errors = validate(payload)
  if (errors.length > 0) {
    return response(400, { messages: errors })
  }

  const { error, data } = await contain(() => createParty(faunaClient, payload))

  if (error) {
    return response(500, { errors: [error] })
  }

  return response(201, data)
}

export const validate = ({ link, name, imageUrl }: PartyCreate) => {
  const errors = []

  if (!name) {
    errors.push('name must be provided for a new party')
  }

  if (!link) {
    errors.push('link must be provided as a url to the party website')
  }

  if (imageUrl === undefined || imageUrl === null) {
    errors.push(
      'imageUrl must be provided with a link to the party logo or an empty string'
    )
  }

  return errors
}
