import { TEventColor } from "./types"

export interface IUser {
  id: string
  name: string
  picturePath?: string | null
}

export interface IEvent {
  id: number
  startDate: string
  endDate: string
  title: string
  color: TEventColor
  description: string
  user: IUser
}

export interface ICalendarCell {
  day: number
  currentMonth: boolean
  date: Date
}

// Add to existing CalendarEvent interface:
export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  color?: string
  variant?: "default" | "dot"
  // New volunteer-specific fields
  isVolunteerTimeslot?: boolean
  sectorName?: string
  status?: "Validé" | "En attente" | "Refusé" | "Annulé"
  role?: string
  capacity?: string // "5/10" format
}