export interface Sector {
  id?: string
  name?: string | null
  description?: string | null
  referent?: string[] | string // Array of referent ids strings
  txands?: string[] | string // Array of creneaux IDs
  skills?: string[] | string // Array of must-have skills
  affectations?: string[] | string // Array of affectation ids
  totalNeeds?: number | string | number[] | string[] // Total number of volunteers needed
  totalVolunteers?: number | string | number[] | string[] // Total number of volunteers assigned
  createdAt?: string // ISO date string
  modifiedAt?: string // ISO date string
  modifiedBy?: string // email of the user who last modified this record
}

export interface SectorRecord {
  id: string
  fields: Sector // Cast to User type
}