import {
  Get,
  Client,
  Collection,
  Documents,
  Map,
  Lambda,
  Paginate,
} from 'faunadb'
import { DBCollections, DBRef } from './types'
import { Party } from '@prole/model'
import { sanitize } from './utils'

export interface ListPartiesDbResponse {
  data: {
    ref: DBRef<DBCollections.Party>
    ts: number
    data: Party
  }[]
}

export const listParties = async (faunaClient: Client) => {
  const { data }: ListPartiesDbResponse = await faunaClient.query(
    Map(
      Paginate(Documents(Collection(DBCollections.Party))),
      Lambda((x) => Get(x))
    )
  )

  return data.map(sanitize)
}
