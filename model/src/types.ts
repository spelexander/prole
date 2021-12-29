export enum Level {
  primary = 'primary',
  secondary = 'secondary',
}

// nano id
export type Id = string

export interface Endorsee {
  endorseeId: Id
  name: string
  url: string
}

export interface Reference {
  author: string
  date: number
  url: string
}

export interface Endorsement {
  id: Id
  endorsee: Endorsee
  level: Level
  references: Reference[]
}
