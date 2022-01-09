export type Id = string

export interface Party {
  id: Id
  name: string
  link: string
  imageUrl: string
}

export interface Reference {
  id: Id
  author: string
  date: number
  link: string
  name: string
}

export interface Endorsement {
  party: Party
  references: Reference[]
}

export interface EndorsementResponse {
  endorsements: Endorsement[]
  source: Source
}

export interface Source {
  id: Id
  domain: string
  name: string
  link: string
}

export type Result<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: string
    }

export interface Feedback {
  subject: string
  feedback: string
  email: string
}
