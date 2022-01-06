import {
  Client,
  Collection,
  Create,
  Merge,
  Ref,
  Get,
  Select,
  If,
  Exists,
  All,
  Match,
  Index,
  Not,
} from 'faunadb'
import { DBCollections, DBIndexes, DBRef } from './types'
import { Id, Reference } from '@prole/model'
import { toId } from '../utils'

export interface EndorsementCreate extends Reference {
  partyId: Id
  sourceId: Id
}

export interface EndorsementCreateDbResponse {
  relatedDomain: string
  ref: DBRef<DBCollections.Endorsements>
  ts: number
  data: Reference
  unique: boolean
}

export interface EndorsementCreateResponse {
  relatedDomain: string
  id: Id
}

export const MISSING_PARTY_OR_SOURCE_ERROR_MESSAGE =
  'partyId and sourceId must be a ref to a valid party and source'

export const DUPLICATE_ENDORSEMENT =
  'link provided must be unique (this endorsement already exists)'

/**
 * creates a new endorsement based on the reference info and returns domains affected by the new data
 */
export const createEndorsement = async (
  faunaClient: Client,
  { partyId, sourceId, link, name, date, author }: EndorsementCreate
) => {
  const party = Ref(Collection(DBCollections.Party), partyId)
  const source = Ref(Collection(DBCollections.Source), sourceId)
  const isDuplicate = Match(Index(DBIndexes.endoresement_link_index_1), link)

  const { ref, relatedDomain, unique }: EndorsementCreateDbResponse =
    await faunaClient.query(
      If(
        All([Exists(source), Exists(party), Not(Exists(isDuplicate))]),
        Merge(
          Create(Collection('Endorsements'), {
            data: {
              party,
              source,
              link,
              name,
              date,
              author,
            },
          }),
          {
            relatedDomain: Select(['data', 'domain'], Get(source)),
            unique: true,
          }
        ),
        {
          relatedDomain: null,
          ref: null,
          unique: Not(Exists(isDuplicate)),
        }
      )
    )

  if (!unique) {
    throw new Error(DUPLICATE_ENDORSEMENT)
  }

  if (!relatedDomain || !ref) {
    throw new Error(MISSING_PARTY_OR_SOURCE_ERROR_MESSAGE)
  }

  return {
    id: toId(ref),
    relatedDomain,
  } as EndorsementCreateResponse
}
