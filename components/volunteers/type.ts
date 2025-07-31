import { VolunteerRecord } from "@/types/user.interface"

export interface VolunteersListProps {
  sectorId: string
  sectorName?: string
  isReferentView?: boolean
  useReferentAPI?: boolean
}

export interface AffectationFields {
  volunteer?: string | string[]
  txand?: string | string[]
  timeslot?: string | string[]
  role?: string
  status?: string
  [key: string]: unknown // Allow for additional fields we might not know about
}

export interface AffectationRecord {
  id: string
  fields: AffectationFields
  timeslotNames?: string[]
}

export interface VolunteerWithAffectations extends VolunteerRecord {
  affectations?: AffectationRecord[]
}

export interface ApiResponse {
  volunteers: VolunteerWithAffectations[]
  timeslots: Record<string, string>
  allSectorTimeslots: Record<string, TimeslotDetails>
  totalTimeslots: number
}

export interface TimeslotDetails {
  id: string
  name: string
  dateStart?: string
  dateEnd?: string
  totalVolunteers?: number
}

export interface TimeslotGroup {
  timeslot: string
  timeslotId: string
  volunteers: VolunteerWithAffectations[]
  count: number
  dateStart?: string
  dateEnd?: string
  totalVolunteers?: number
}

export interface ReferentTimeslotGroup {
  timeslot: {
    id: string
    name: string
    dateStart?: string
    dateEnd?: string
    totalVolunteers?: number
    [key: string]: any
  }
  timeslotId: string
  volunteers: VolunteerWithAffectations[]
  count: number
  dateStart?: string
  dateEnd?: string
  totalVolunteers?: number
}

export interface TimeslotStats {
  totalTimeslots: number
  timelsotsWithVolunteers: number
  detailedTimeslots: number
  volunteerCount: number
}

export type ViewMode = "cards" | "tables"

export interface VolunteerViewProps {
  volunteers: VolunteerWithAffectations[]
  timeslotGroups: TimeslotGroup[]
  selectedTimeslot: string
  getDisplayName: (volunteer: VolunteerRecord) => string
  timeslots?: Record<string, string>
  allTimeslots?: Record<string, string>
  timeslotDetails?: Record<string, TimeslotDetails>
  allTimeslotDetails?: Record<string, TimeslotDetails>
}

export interface ReferentVolunteerViewProps {
  volunteers: VolunteerWithAffectations[]
  timeslotGroups: ReferentTimeslotGroup[]
  selectedTimeslot: string
  getDisplayName: (volunteer: VolunteerRecord) => string
  timeslots?: Record<string, string>
  allTimeslots?: Record<string, string>
  timeslotDetails?: Record<string, TimeslotDetails>
  allTimeslotDetails?: Record<string, TimeslotDetails>
}

export interface VolunteersHeaderProps {
  sectorName?: string
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  selectedTimeslot: string
  onTimeslotChange: (timeslot: string) => void
  timeslotGroups: TimeslotGroup[]
  volunteers: VolunteerWithAffectations[]
  filteredVolunteersCount: number
  onRefresh: () => void
  timeslotStats?: TimeslotStats
}