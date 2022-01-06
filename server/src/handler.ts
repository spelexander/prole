import { Router } from 'itty-router'
import { addEndorsement, getEndorsement } from './routes/endorsement'
import faunadb from 'faunadb'
import { addParty } from './routes/party'
import { addSource } from './routes/source'
import { withAuth } from './middleware/with-auth'
import { IttyRequest } from './types'
import { headers } from './constants'

const router = Router()

declare const FAUNA_SECRET: string

const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
  // No closer regions to AUS yet :(
  domain: 'db.us.fauna.com',
  scheme: 'https',
})

declare const caches: { default: Cache }

const withResources = (request: IttyRequest) => {
  request.faunaClient = faunaClient
  request.workerCache = caches.default as Cache
}

const defaultHandler = () =>
  new Response(JSON.stringify({ messages: ['Not found'] }), {
    status: 404,
    headers,
  })

router
  .get('/api/endorsement/:domain', withResources, getEndorsement)
  .post('/api/endorsement', withResources, withAuth, addEndorsement)
  .post('/api/party', withResources, withAuth, addParty)
  .post('/api/source', withResources, withAuth, addSource)
  /* 404 responses */
  .get('*', defaultHandler)
  .post('*', defaultHandler)
  .put('*', defaultHandler)
  .delete('*', defaultHandler)

export const handleRequest = (request: any) => router.handle(request)
