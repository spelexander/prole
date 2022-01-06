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
import { Id, Party } from '@prole/model'
import { toId } from '../utils'

export type PartyCreate = Omit<Party, 'id'>

interface PartyCreateDbResponse {
  ref: DBRef<DBCollections.Party>
}

interface PartyCreateResponse {
  id: Id
}

export const PARTY_ALREADY_EXISTS =
  'link and name must be unique (a party already exists)'

export const createParty = async (
  faunaClient: Client,
  { imageUrl, link, name }: PartyCreate
) => {
  const { ref }: PartyCreateDbResponse = await faunaClient.query(
    If(
      Not(
        Any([
          Exists(Match(Index(DBIndexes.party_name_index_1), name)),
          Exists(Match(Index(DBIndexes.party_link_index_1), link)),
        ])
      ),
      Create(Collection(DBCollections.Party), {
        data: {
          link,
          name,
          imageUrl,
        },
      }),
      {
        ref: null,
      }
    )
  )

  if (ref === null) {
    throw new Error(PARTY_ALREADY_EXISTS)
  }

  return {
    id: toId(ref),
  } as PartyCreateResponse
}
