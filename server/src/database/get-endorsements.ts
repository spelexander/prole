import {
  Client,
  Exists,
  Get,
  If,
  Index,
  Lambda,
  Map as FMap,
  Match,
  Paginate,
  Select,
  Var,
} from 'faunadb'
import { DBCollections, DBIndexes, DBRef } from './types'
import { EndorsementResponse, Id, Party, Reference } from '@prole/model'
import { toId } from '../utils'
import { Source } from '@prole/model/src/types'
import { sanitize } from './utils'

interface EndorsementReferenceDbData {
  party: DBRef<DBCollections.Party>
  source: DBRef<DBCollections.Source>
  name: string
  link: string
  author: string
  date: number
}

export interface EndorsementDb {
  reference: {
    ref: DBRef<DBCollections.Endorsements>
    ts: number
    data: EndorsementReferenceDbData
  }
  party: {
    ref: DBRef<DBCollections.Party>
    ts: number
    data: Omit<Party, 'id'>
  }
}

export interface EndorsementDbPayload {
  source: {
    ref: DBRef<DBCollections.Source>
    ts: number
    data: Omit<Source, 'id'>
  }
  endorsements: { data: EndorsementDb[] }
}

export const MISSING_DOMAIN =
  'domain must be the domain for a source organisation'

/**
 * Get the endorsements, parties and source for a provided source domain
 */
export const getEndorsementsForDomain = async (
  faunaClient: Client,
  domain: string
) => {
  // find the source ref for the provided domain
  const domainSourceMatcher = Match(
    Index(DBIndexes.source_domain_index_1),
    domain
  )

  const result: EndorsementDbPayload = await faunaClient.query(
    If(
      Exists(domainSourceMatcher),
      {
        source: Get(domainSourceMatcher),
        endorsements: FMap(
          Paginate(
            Match(
              Index(DBIndexes.endoresement_source_index_1),
              Select('ref', Get(domainSourceMatcher))
            )
          ),
          Lambda('data', {
            reference: Get(Var('data')),
            party: Get(Select(['data', 'party'], Get(Var('data')))),
          })
        ),
      },
      {
        source: null,
        endorsements: null,
      }
    )
  )

  const { source, endorsements } = result

  if (source === null || endorsements === null) {
    // no source organisation found for the provided domain
    throw new Error(MISSING_DOMAIN)
  }

  const parties = new Map<Id, Party>()

  // Group the endorsement references by party id and record unique parties
  const referencesByParty = endorsements.data.reduce(
    (map: Map<Id, Reference[]>, { reference, party }: EndorsementDb) => {
      const partyId = toId(party.ref) as Id
      const partyResponse = sanitize<Party>(party)
      const referenceResponse = sanitize<Reference>(reference)

      const existing = map.get(partyId) ?? []
      map.set(
        partyId,
        existing.concat([
          {
            id: referenceResponse.id,
            name: referenceResponse.name,
            author: referenceResponse.author,
            link: referenceResponse.link,
            date: referenceResponse.date,
          },
        ])
      )
      parties.set(partyId, partyResponse)

      return map
    },
    new Map<Id, Reference[]>()
  )

  return {
    endorsements: Array.from(referencesByParty.keys()).map((partyId: Id) => ({
      references: referencesByParty.get(partyId),
      party: parties.get(partyId),
    })),
    source: sanitize(source),
  } as EndorsementResponse
}
