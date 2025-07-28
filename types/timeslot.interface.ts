export interface Timeslot {
  id?: string // Unique identifier for the timeslot
  name?: string // Name of the timeslot
  dateStart?: string // Start date of the timeslot in ISO format
  dateEnd?: string // End date of the timeslot in ISO format
  sector?: string[] // Array of pole IDs - Link to Pole table
  totalVolunteers?: number // total of volunteers  expected
  totalNeeds?: number | string | number[] | string[] // number of volunteers left to assign
  affectations?: string[] // Array of affectation IDs - Link to Affectation table
  details?: string // Additional details about the timeslot
  createdAt?: string // ISO date string for when the timeslot was created
  modifiedAt?: string // ISO date string for when the timeslot was last modified
  modifiedBy?: string // Email of the user who last modified this record
}

export interface TimeslotRecord {
  id: string // Unique identifier for the timeslot record
  fields: Timeslot // Fields of the timeslot record cast to Timeslot type
}

// ✅ FIXED: Define proper interfaces that match your actual data structure
export interface EnrichedTimeslot {
  id: string
  name: string
  dateStart?: string
  dateEnd?: string
  sectorName: string
  sectorDescription: string
  sectorColor: string
  status: string
  role?: unknown
  totalVolunteers?: unknown
  currentVolunteers: number
  affectationId: string
  timing: {
    daysUntilStart: number | null
    hoursUntilStart: number | null
    isToday: boolean
    isTomorrow: boolean
    isThisWeek: boolean
    isPast: boolean
    isUpcoming: boolean
  }
}

export interface TimeslotsResult {
  timeslots: EnrichedTimeslot[]
  message?: string
  volunteer?: {
    id: string
    name: string
    email: unknown
  }
  debug?: {
    affectationIdsFound: number
    timeslotsFound: number
    sectorsFound: number
    cacheHit: boolean
  }
}