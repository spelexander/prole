export enum DBCollections {
  Endorsements = 'Endorsements',
  Party = 'Party',
  Source = 'Source',
}

export enum DBIndexes {
  source_domain_index_1 = 'source_domain_index_1',
  source_link_index_1 = 'source_link_index_1',
  source_name_index_1 = 'source_name_index_1',
  party_link_index_1 = 'party_link_index_1',
  party_name_index_1 = 'party_name_index_1',
  endoresement_source_index_1 = 'endoresement_source_index_1',
  endoresement_link_index_1 = 'endoresement_link_index_1',
}

export interface DBRef<T extends DBCollections> {
  '@ref': {
    id: string
    collection: {
      '@ref': {
        id: T
        collection: {
          '@ref': {
            id: 'collections'
          }
        }
      }
    }
  }
}
