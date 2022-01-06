import { Id } from '@prole/model'
import { DBCollections, DBRef } from './types'
import { toId } from '../utils'

/**
 * Will add the ref info to the object as an id field
 */
export const sanitize = <T extends { id: Id }>({
  ref,
  data,
}: {
  ref: DBRef<DBCollections>
  ts: number
  data: Omit<T, 'id'>
}): T =>
  ({
    id: toId(ref),
    ...data,
  } as T)
