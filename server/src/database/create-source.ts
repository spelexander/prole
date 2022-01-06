import {
  Any,
  Client,
  Collection,
  Create,
  Exists,
  If,
  Index,
  Match,
  Not,
} from 'faunadb'
import { DBCollections, DBIndexes, DBRef } from './types'
import { Id, Source } from '@prole/model'
import { toId } from '../utils'

export type SourceCreate = Omit<Source, 'id'>

interface SourceCreateDbResponse {
  ref: DBRef<DBCollections.Source>
}

interface SourceCreateResponse {
  id: Id
}

export const SOURCE_ALREADY_EXISTS =
  'domain, link and name must be unique (a source organisation already exists)'

export const createSource = async (
  faunaClient: Client,
  { domain, link, name }: SourceCreate
) => {
  const { ref }: SourceCreateDbResponse = await faunaClient.query(
    If(
      Not(
        Any([
          Exists(Match(Index(DBIndexes.source_domain_index_1), domain)),
          Exists(Match(Index(DBIndexes.source_name_index_1), name)),
          Exists(Match(Index(DBIndexes.source_link_index_1), link)),
        ])
      ),
      Create(Collection(DBCollections.Source), {
        data: {
          link,
          name,
          domain,
        },
      }),
      {
        ref: null,
      }
    )
  )

  if (ref === null) {
    throw new Error(SOURCE_ALREADY_EXISTS)
  }

  return {
    id: toId(ref),
  } as SourceCreateResponse
}
