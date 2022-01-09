import { Router } from 'itty-router'
import { addEndorsement, getEndorsement } from './routes/endorsement'
import faunadb from 'faunadb'
import { addParty, parties } from './routes/party'
import { addSource, search, sources } from './routes/source'
import { withAuth } from './middleware/with-auth'
import { IttyRequest } from './types'
import { response } from './routes/utils'
import { feedback } from './routes/feedback'

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

const defaultHandler = () => response(404, { messages: ['Not found'] })
const adminHandler = () =>
  response(200, { messages: ['the provided authentication is valid'] })

router
  .get('/api/endorsement', withResources, getEndorsement)
  .post('/api/endorsement', withResources, withAuth, addEndorsement)
  .get('/api/party/all', withResources, parties)
  .post('/api/party', withResources, withAuth, addParty)
  .get('/api/source/all', withResources, sources)
  .get('/api/source/search', withResources, search)
  .post('/api/source', withResources, withAuth, addSource)
  .get('/api/admin', withAuth, adminHandler)
  .post('/api/feedback', feedback)

  /* 404 responses */
  .get('*', defaultHandler)
  .post('*', defaultHandler)
  .put('*', defaultHandler)
  .delete('*', defaultHandler)

export const handleRequest = (request: any) => router.handle(request)
