import { Client } from 'faunadb'
import { Request as IRequest } from 'itty-router'

export type IttyRequest = IRequest &
  Request & {
    auth: void | {
      user: string
    }
    faunaClient: Client
    workerCache: Cache
  }
