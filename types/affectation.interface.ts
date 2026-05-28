export interface Affectation {
  number: number // Unique identifier for the affectation
  volunteer?: string[] // Array of volunteer IDs - Link to Membres table
  txand?: string[] // Array of timeslot IDs - Link to Creneaux table
  pole?: string[] // Array of sector IDs - Link to Pole table
  status?: "Validé" | "En attente" | "Refusé" // Status of the affectation
  createdAt?: string // ISO date string for when the affectation was created
  modifiedAt?: string // ISO date string for when the affectation was last modified
  modifiedBy?: string // Email of the user who last modified this record
}

export interface EnrichedSector {
  id?: string
  name: string
  description?: string
  color: string
}

export interface EnrichedTimeslot {
  id?: string
  name: string
  dateStart?: string // ISO string
  dateEnd?: string // ISO string
  duration?: number
}

export interface EnrichedTimingInfo {
  daysUntilStart: number | null
  hoursUntilStart: number | null
  isToday: boolean
  isTomorrow: boolean
  isThisWeek: boolean
  startDate?: string // ISO string
  endDate?: string // ISO string
  isPast: boolean
  isUpcoming: boolean
}

export interface EnrichedTeamInfo {
  totalVolunteers: number
  isTeamWork: boolean
}

export interface EnrichedPriority {
  level: string
  isHigh: boolean
  isMedium: boolean
}

export interface EnrichedTimeslots {
  count: number
  list: EnrichedTimeslot[]
  next: EnrichedTimeslot | null
}

export interface EnrichedAffectationData {
  sector: EnrichedSector
  timeslots: EnrichedTimeslots
  timing: EnrichedTimingInfo | null
  team: EnrichedTeamInfo
  priority: EnrichedPriority
}

export interface EnrichedAssignment {
  id: string
  fields: Record<string, unknown>
  createdAt: string
  enriched: {
    sector: EnrichedSector
    timeslots: {
      count: number
      list: EnrichedTimeslot[]
      next: EnrichedTimeslot | null
    }
    timing: EnrichedTimeslot | null
    team: {
      totalVolunteers: number
      isTeamWork: boolean
    }
    priority: {
      level: string
      isHigh: boolean
      isMedium: boolean
    }
  }
}

export interface AffectationRecord {
  id: string // Unique identifier for the record
  fields: Affectation // Fields of the affectation record
  enriched?: EnrichedAffectationData // Optional enriched data
}

export interface EnrichedAffectationRecord extends AffectationRecord {
  enriched: EnrichedAffectationData // Required enriched data
}

// Type guard to check if an affectation record is enriched
export function isEnrichedAffectation(
  affectation: AffectationRecord
): affectation is EnrichedAffectationRecord {
  return affectation.enriched !== undefined
}

// Helper type for API responses
export type AffectationApiResponse = EnrichedAffectationRecord[]