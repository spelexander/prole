import { contain } from '../utils'
import { IttyRequest } from '../types'
import {
  createEndorsement,
  EndorsementCreate,
  MISSING_PARTY_OR_SOURCE_ERROR_MESSAGE,
} from '../database/create-endorsement'
import {
  getEndorsementsForDomain,
  MISSING_DOMAIN,
} from '../database/get-endorsements'
import { response } from './utils'
import { isValidDomainName, parseHostName } from '@prole/common/src/utils'

/**
 * lookup endorsements for the provided source organisation domain
 */
export const getEndorsement = async (request: IttyRequest) => {
  const { faunaClient, workerCache, query } = request
  const domain = parseHostName(query?.domain)

  if (!domain || !isValidDomainName(domain)) {
    return response(400, {
      messages: ['a valid domain name must be provided'],
    })
  }

  const cachedResult = await workerCache.match(toCacheLocation(domain))
  if (cachedResult) {
    return cachedResult
  }

  const { error, data } = await contain(() =>
    getEndorsementsForDomain(faunaClient, domain)
  )

  if (error) {
    if (error === MISSING_DOMAIN) {
      return response(404, { messages: [error] })
    }

    return response(500, { errors: [error] })
  }

  await workerCache.put(request.url, response(200, data))
  // Response body can't be consumed more than once
  return response(200, data)
}

/**
 * Creates a new endorsement made by a source for a political party
 */
export const addEndorsement = async (request: IttyRequest) => {
  const { faunaClient, workerCache } = request

  if (!request.json) {
    return response(400, { messages: ['no request payload provided'] })
  }

  const payload: EndorsementCreate = await request.json()

  const errors = validate(payload)
  if (errors.length > 0) {
    return response(400, { messages: errors })
  }

  const { error, data } = await contain(() =>
    createEndorsement(faunaClient, payload)
  )

  if (error || !data?.relatedDomain) {
    if (error === MISSING_PARTY_OR_SOURCE_ERROR_MESSAGE) {
      return response(404, { messages: [error] })
    }
    return response(500, { errors: [error] })
  }

  // Invalidate the cache for the affected source
  const { error: invalidationError } = await contain(() =>
    workerCache.delete(toCacheLocation(data.relatedDomain))
  )
  if (invalidationError) {
    return response(500, {
      errors: [
        'created but unable to invalidate cache (this new data wont appear immediately)',
      ],
    })
  }

  return response(201, data)
}

const toCacheLocation = (domain: string) => `https://${domain}`

export const validate = ({
  partyId,
  link,
  name,
  sourceId,
  date,
  author,
}: EndorsementCreate) => {
  const errors = []

  if (!partyId) {
    errors.push('partyId must be provided')
  }

  if (!sourceId) {
    errors.push('sourceId must be provided')
  }

  if (!link) {
    errors.push('link must be provided as a url to the endorsement source')
  }

  if (!name) {
    errors.push(
      'name must be provided as a description of endorsement source (e.g. article title)'
    )
  }

  if (!date) {
    errors.push('date must be provided as a timestamp ms since epoch')
  }

  if (!author) {
    errors.push(
      'author must be provided for the endorsement source (if not present Editorial, Opinion are sufficient)'
    )
  }

  return errors
}
