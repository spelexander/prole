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
import { Source } from '@prole/model'
import { sanitize } from './utils'

export interface ListSourcesDbResponse {
  data: {
    ref: DBRef<DBCollections.Source>
    ts: number
    data: Source
  }[]
}

export const listSources = async (faunaClient: Client) => {
  const { data }: ListSourcesDbResponse = await faunaClient.query(
    Map(
      Paginate(Documents(Collection(DBCollections.Source))),
      Lambda((x) => Get(x))
    )
  )

  return data.map(sanitize)
}
