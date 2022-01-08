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
} from 'faunadb'
import { DBCollections, DBRef } from './types'
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
}

export interface EndorsementCreateResponse {
  relatedDomain: string
  id: Id
}

export const MISSING_PARTY_OR_SOURCE_ERROR_MESSAGE =
  'partyId and sourceId must be a ref to a valid party and source'

/**
 * creates a new endorsement based on the reference info and returns domains affected by the new data
 */
export const createEndorsement = async (
  faunaClient: Client,
  { partyId, sourceId, link, name, date, author }: EndorsementCreate
) => {
  const party = Ref(Collection(DBCollections.Party), partyId)
  const source = Ref(Collection(DBCollections.Source), sourceId)

  const { ref, relatedDomain }: EndorsementCreateDbResponse =
    await faunaClient.query(
      If(
        All([Exists(source), Exists(party)]),
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
          }
        ),
        {
          relatedDomain: null,
          ref: null,
        }
      )
    )

  if (!relatedDomain || !ref) {
    throw new Error(MISSING_PARTY_OR_SOURCE_ERROR_MESSAGE)
  }

  return {
    id: toId(ref),
    relatedDomain,
  } as EndorsementCreateResponse
}
