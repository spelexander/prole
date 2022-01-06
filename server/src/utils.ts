import { DBCollections, DBRef } from './database/types'
import { Id, Result } from '@prole/model/src/types'

export const toId = (ref: DBRef<DBCollections>): Id => {
  const [{ id }] = Object.values(ref)
  return id as Id
}

export const contain = async <T>(
  callback: () => Promise<T>
): Promise<Result<T>> => {
  try {
    return { data: await callback(), error: null }
  } catch (e: any) {
    console.error(e)

    return {
      error: e.message,
      data: null,
    }
  }
}
