import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// ✅ Types and interfaces
export interface CalendarUser {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  sectorDescrition?: string // New field for sector description
  startDate: string // ISO 8601 string from Airtable
  endDate: string   // ISO 8601 string from Airtable
  user: CalendarUser
  color?: string
  variant?: "default" | "dot"
  isVolunteerTimeslot?: boolean
  sectorName?: string
  status?: "Validé" | "En attente" | "Refusé" | "Annulé"
  role?: string
  capacity?: string // "5/10" format
  affectationId?: string
  totalVolunteers?: number
  currentVolunteers?: number
}

export interface VolunteerTimeslot {
  id: string
  name: string
  dateStart: string
  dateEnd: string
  sectorName: string
  description?: string
  sectorDescription?: string
  status: string
  role?: string
  totalVolunteers?: number
  currentVolunteers?: number
  affectationId: string
}

export type CalendarView = "day" | "week" | "month" | "year" | "agenda"
export type BadgeVariant = "dot" | "colored" | "mixed"
export type WorkingHours = { [key: number]: { from: number; to: number } }
export type VisibleHours = { from: number; to: number }

interface CalendarState {
  // Date and view state
  selectedDate: Date
  view: CalendarView

  // User selection
  selectedUserId: string // "all" or specific user ID
  users: CalendarUser[]

  // Events
  events: CalendarEvent[]
  volunteerTimeslots: VolunteerTimeslot[]

  // UI preferences
  badgeVariant: BadgeVariant
  visibleHours: VisibleHours
  workingHours: WorkingHours

  // Volunteer-specific
  showVolunteerTimeslots: boolean
  isVolunteer: boolean
  volunteerLoading: boolean

  // Loading states
  loading: boolean
  error: string | null
}

interface CalendarActions {
  // Date and view actions
  setSelectedDate: (date: Date) => void
  setView: (view: CalendarView) => void

  // User actions
  setSelectedUserId: (userId: string) => void
  setUsers: (users: CalendarUser[]) => void

  // Event actions
  setEvents: (events: CalendarEvent[]) => void
  addEvent: (event: CalendarEvent) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  removeEvent: (id: string) => void

  // Volunteer actions
  setVolunteerTimeslots: (timeslots: VolunteerTimeslot[]) => void
  setShowVolunteerTimeslots: (show: boolean) => void
  setIsVolunteer: (isVolunteer: boolean) => void
  setVolunteerLoading: (loading: boolean) => void

  // UI actions
  setBadgeVariant: (variant: BadgeVariant) => void
  setVisibleHours: (hours: VisibleHours) => void
  setWorkingHours: (hours: WorkingHours) => void

  // Utility actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void

  // Computed getters
  getSelectedDate: () => Date
  getAllEvents: () => CalendarEvent[]
  getFilteredEvents: (view: CalendarView, date: Date, userId: string) => CalendarEvent[]
  getCurrentUserTimeslots: () => VolunteerTimeslot[]
}

type CalendarStore = CalendarState & CalendarActions

// ✅ Default values
const DEFAULT_WORKING_HOURS: WorkingHours = {
  0: { from: 0, to: 0 },    // Sunday - closed
  1: { from: 8, to: 17 },   // Monday
  2: { from: 8, to: 17 },   // Tuesday
  3: { from: 8, to: 17 },   // Wednesday
  4: { from: 8, to: 17 },   // Thursday
  5: { from: 8, to: 17 },   // Friday
  6: { from: 8, to: 12 },   // Saturday - half day
}

const DEFAULT_VISIBLE_HOURS: VisibleHours = { from: 7, to: 18 }

// ✅ Calendar Store
export const useCalendarStore = create<CalendarStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedDate: new Date(),
        view: "month",
        selectedUserId: "all",
        users: [],
        events: [],
        volunteerTimeslots: [],
        badgeVariant: "dot",
        visibleHours: DEFAULT_VISIBLE_HOURS,
        workingHours: DEFAULT_WORKING_HOURS,
        showVolunteerTimeslots: true,
        isVolunteer: false,
        volunteerLoading: false,
        loading: false,
        error: null,

        // Date and view actions
        setSelectedDate: (date) => set({ selectedDate: date }),
        setView: (view) => set({ view }),

        // User actions
        setSelectedUserId: (userId) => set({ selectedUserId: userId }),
        setUsers: (users) => set({ users }),

        // Event actions
        setEvents: (events) => set({ events }),
        addEvent: (event) => set((state) => ({
          events: [...state.events, event]
        })),
        updateEvent: (id, updates) => set((state) => ({
          events: state.events.map(event =>
            event.id === id ? { ...event, ...updates } : event
          )
        })),
        removeEvent: (id) => set((state) => ({
          events: state.events.filter(event => event.id !== id)
        })),

        // Volunteer actions
        setVolunteerTimeslots: (timeslots) => set({ volunteerTimeslots: timeslots }),
        setShowVolunteerTimeslots: (show) => set({ showVolunteerTimeslots: show }),
        setIsVolunteer: (isVolunteer) => set({ isVolunteer }),
        setVolunteerLoading: (loading) => set({ volunteerLoading: loading }),

        // UI actions
        setBadgeVariant: (variant) => set({ badgeVariant: variant }),
        setVisibleHours: (hours) => set({ visibleHours: hours }),
        setWorkingHours: (hours) => set({ workingHours: hours }),

        // Utility actions
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),

        // Computed getters
        getSelectedDate: () => get().selectedDate,

        getAllEvents: () => {
          const { events, volunteerTimeslots, showVolunteerTimeslots } = get()

          // Convert volunteer timeslots to calendar events
          const volunteerEvents: CalendarEvent[] = volunteerTimeslots.map(timeslot => ({
            id: timeslot.id,
            title: timeslot.name,
            sectorDescription: timeslot.sectorDescription, // ✅ Keep original field
            startDate: timeslot.dateStart,
            endDate: timeslot.dateEnd,
            user: {
              id: 'current-user',
              name: 'Mes créneaux',
              email: '',
            },
            color: 'green',
            variant: 'default',
            isVolunteerTimeslot: true,
            sectorName: timeslot.sectorName,
            status: timeslot.status as any,
            role: timeslot.role,
            capacity: timeslot.totalVolunteers ?
              `${timeslot.currentVolunteers || 0}/${timeslot.totalVolunteers}` : undefined,
            affectationId: timeslot.affectationId,
            totalVolunteers: timeslot.totalVolunteers,
            currentVolunteers: timeslot.currentVolunteers,
          }))

          // Combine events based on volunteer timeslot visibility
          return showVolunteerTimeslots
            ? [...events, ...volunteerEvents]
            : events
        },

        getFilteredEvents: (view, date, userId) => {
          const allEvents = get().getAllEvents()

          return allEvents.filter(event => {
            // Parse dates
            const eventStartDate = new Date(event.startDate)
            const eventEndDate = new Date(event.endDate)

            // Date filtering based on view
            let dateMatch = false

            if (view === "year") {
              const yearStart = new Date(date.getFullYear(), 0, 1)
              const yearEnd = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)
              dateMatch = eventStartDate <= yearEnd && eventEndDate >= yearStart
            } else if (view === "month" || view === "agenda") {
              const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
              const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
              dateMatch = eventStartDate <= monthEnd && eventEndDate >= monthStart
            } else if (view === "week") {
              const dayOfWeek = date.getDay()
              const weekStart = new Date(date)
              weekStart.setDate(date.getDate() - dayOfWeek)
              weekStart.setHours(0, 0, 0, 0)

              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekStart.getDate() + 6)
              weekEnd.setHours(23, 59, 59, 999)

              dateMatch = eventStartDate <= weekEnd && eventEndDate >= weekStart
            } else if (view === "day") {
              const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
              const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
              dateMatch = eventStartDate <= dayEnd && eventEndDate >= dayStart
            }

            if (!dateMatch) return false

            // User filtering
            if (userId === "all") return true

            // Handle volunteer timeslots
            if (event.isVolunteerTimeslot) {
              return get().showVolunteerTimeslots
            }

            return event.user.id === userId
          })
        },

        getCurrentUserTimeslots: () => get().volunteerTimeslots,
      }),
      {
        name: 'calendar-store',
        partialize: (state) => ({
          // Only persist UI preferences, not data
          view: state.view,
          badgeVariant: state.badgeVariant,
          visibleHours: state.visibleHours,
          workingHours: state.workingHours,
          showVolunteerTimeslots: state.showVolunteerTimeslots,
        }),
      }
    ),
    { name: 'calendar-store' }
  )
)

// ✅ Hydration hook for SSR
export const useCalendarStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}

// ✅ Convenience hooks
export const useCalendarEvents = () => {
  const getAllEvents = useCalendarStore(state => state.getAllEvents)
  const getFilteredEvents = useCalendarStore(state => state.getFilteredEvents)
  const selectedDate = useCalendarStore(state => state.selectedDate)
  const view = useCalendarStore(state => state.view)
  const selectedUserId = useCalendarStore(state => state.selectedUserId)

  return {
    allEvents: getAllEvents(),
    filteredEvents: getFilteredEvents(view, selectedDate, selectedUserId),
  }
}

export const useVolunteerTimeslots = () => {
  const timeslots = useCalendarStore(state => state.volunteerTimeslots)
  const loading = useCalendarStore(state => state.volunteerLoading)
  const showTimeslots = useCalendarStore(state => state.showVolunteerTimeslots)
  const setShowTimeslots = useCalendarStore(state => state.setShowVolunteerTimeslots)

  return {
    timeslots,
    loading,
    showTimeslots,
    setShowTimeslots,
  }
}