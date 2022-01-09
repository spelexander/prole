import { IttyRequest } from '../types'
import { contain } from '../utils'
import { isValidDomainName } from '@prole/common/src/utils'
import {
  createSource,
  SOURCE_ALREADY_EXISTS,
  SourceCreate,
} from '../database/create-source'
import { response } from './utils'
import { listSources } from '../database/list-sources'
import { search as fuzzySearch } from 'fast-fuzzy'
import { Source } from '@prole/model'

/**
 * Adds a new source authoring/donating entity (e.g. company, organisation, person)
 */
export const addSource = async (request: IttyRequest) => {
  const { faunaClient } = request

  if (!request.json) {
    return response(400, { messages: ['no request payload provided'] })
  }

  const payload: SourceCreate = await request.json()

  const errors = validate(payload)
  if (errors.length > 0) {
    return response(400, { messages: errors })
  }

  const { error, data } = await contain(() =>
    createSource(faunaClient, payload)
  )

  if (error) {
    if (error === SOURCE_ALREADY_EXISTS) {
      return response(400, { messages: [error] })
    }

    return response(500, { errors: [error] })
  }

  return response(201, data)
}

/**
 * Get all news/data sources prole has data for
 */
export const sources = async (request: IttyRequest) => {
  const { faunaClient } = request

  const { error, data } = await contain(() => listSources(faunaClient))

  if (error) {
    return response(500, { errors: [error] })
  }

  return response(200, data)
}

export const validate = ({ link, name, domain }: SourceCreate) => {
  const errors = []

  if (!domain || !isValidDomainName(domain)) {
    errors.push('domain must be provided as a valid domain name')
  }

  if (!link) {
    errors.push(
      'link must be provided as a url to the source organisation website'
    )
  }

  if (!name) {
    errors.push('name of the source organisation must be provided')
  }

  return errors
}

/**
 * Fuzzy search available sources based on domain and name
 */
export const search = async (request: IttyRequest) => {
  const { faunaClient, query } = request

  const term = query?.term
  if (!term) {
    return response(400, {
      messages: ['term must be provided as a string for search'],
    })
  }

  const { error, data } = await contain(() => listSources(faunaClient))

  if (error) {
    return response(500, { errors: [error] })
  }

  const results = fuzzySearch(term, data!, {
    keySelector: (source: Source) => `${source.domain} ${source.name}`,
  })

  return response(200, results)
}
