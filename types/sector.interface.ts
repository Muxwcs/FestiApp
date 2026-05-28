// export interface Sector {
//   id?: string
//   name?: string | null
//   description?: string | null
//   referent?: string[] | string // Array of referent ids strings
//   txands?: string[] | string // Array of creneaux IDs
//   skills?: string[] | string // Array of must-have skills
//   affectations?: string[] | string // Array of affectation ids
//   totalNeeds?: number | string | number[] | string[] // Total number of volunteers needed
//   totalVolunteers?: number | string | number[] | string[] // Total number of volunteers assigned
//   createdAt?: string // ISO date string
//   modifiedAt?: string // ISO date string
//   modifiedBy?: string // email of the user who last modified this record
// }

// export interface SectorRecord {
//   id: string
//   fields: Sector // Cast to User type
// }

export interface Sector {
  id?: string
  name?: string | null
  description?: string | null
  referent?: string[] | string | null // Array of referent ids or single string
  txands?: string[] | string | null // Array of creneaux IDs
  skills?: string[] | string | null // Array of must-have skills
  affectations?: string[] | string | null // Array of affectation ids
  totalNeeds?: number | string | number[] | string[] | null // Total number of volunteers needed
  totalVolunteers?: number | string | number[] | string[] | null // Total number of volunteers assigned
  color?: string | null // ✅ Added missing color field
  status?: string | null // ✅ Added missing status field
  createdAt?: string | null // ISO date string
  modifiedAt?: string | null // ISO date string
  modifiedBy?: string | null // email of the user who last modified this record
}

export interface SectorRecord {
  id: string
  fields: Sector
  createdTime: string // ✅ Added missing createdTime field
}

// ✅ ADDED: Type-safe helper to convert Airtable nulls to TypeScript-friendly types
export interface CleanSector {
  id?: string
  name?: string
  description?: string
  referent?: string[] | string
  txands?: string[] | string
  skills?: string[] | string
  affectations?: string[] | string
  totalNeeds?: number | string | number[] | string[]
  totalVolunteers?: number | string | number[] | string[]
  color?: string
  status?: string
  createdAt?: string
  modifiedAt?: string
  modifiedBy?: string
}

export interface CleanSectorRecord {
  id: string
  fields: CleanSector
  createdTime: string
}

// ✅ ADDED: Utility function to clean sector data
export function cleanSectorData(sector: SectorRecord): CleanSectorRecord {
  return {
    id: sector.id,
    createdTime: sector.createdTime,
    fields: {
      id: sector.fields.id ?? undefined,
      name: sector.fields.name ?? undefined,
      description: sector.fields.description ?? undefined,
      referent: sector.fields.referent ?? undefined,
      txands: sector.fields.txands ?? undefined,
      skills: sector.fields.skills ?? undefined,
      affectations: sector.fields.affectations ?? undefined,
      totalNeeds: sector.fields.totalNeeds ?? undefined,
      totalVolunteers: sector.fields.totalVolunteers ?? undefined,
      color: sector.fields.color ?? undefined,
      status: sector.fields.status ?? undefined,
      createdAt: sector.fields.createdAt ?? undefined,
      modifiedAt: sector.fields.modifiedAt ?? undefined,
      modifiedBy: sector.fields.modifiedBy ?? undefined,
    }
  }
}