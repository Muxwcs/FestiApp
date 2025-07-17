"use client"

import { createContext, useContext, useEffect, useState } from "react"

import type { Dispatch, ReactNode, SetStateAction } from "react"
import { IUser, CalendarEvent } from "../interfaces"
import { TBadgeVariant, TWorkingHours, TVisibleHours, TCalendarView } from "../types"
import { useSession } from "next-auth/react"
import { useVolunteerCalendar } from "@/hooks/use-volunteer-calendar"

interface ICalendarContext {
  selectedDate: Date
  setSelectedDate: (date: Date | undefined) => void
  selectedUserId: string
  setSelectedUserId: (userId: string) => void
  badgeVariant: TBadgeVariant
  setBadgeVariant: (variant: TBadgeVariant) => void
  users: IUser[]
  workingHours: TWorkingHours
  setWorkingHours: Dispatch<SetStateAction<TWorkingHours>>
  visibleHours: TVisibleHours
  setVisibleHours: Dispatch<SetStateAction<TVisibleHours>>
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  // setLocalEvents: Dispatch<SetStateAction<IEvent[]>>
  view: "year" | "month" | "week" | "day" | "agenda"
  setView: Dispatch<SetStateAction<"year" | "month" | "week" | "day" | "agenda">>
  // Volunteer-specific
  volunteerEvents: CalendarEvent[]
  showVolunteerTimeslots: boolean
  setShowVolunteerTimeslots: (show: boolean) => void
  isVolunteer: boolean
  volunteerLoading: boolean
  refreshVolunteerTimeslots: () => void
}

// const CalendarContext = createContext({} as ICalendarContext)
const CalendarContext = createContext<ICalendarContext | undefined>(undefined)

interface CalendarProviderProps {
  children: ReactNode
  users: IUser[]
  initialEvents?: CalendarEvent[]
  initialView?: TCalendarView
}

const WORKING_HOURS = {
  0: { from: 0, to: 0 },
  1: { from: 8, to: 17 },
  2: { from: 8, to: 17 },
  3: { from: 8, to: 17 },
  4: { from: 8, to: 17 },
  5: { from: 8, to: 17 },
  6: { from: 8, to: 12 },
}

const VISIBLE_HOURS = { from: 7, to: 18 }

export function CalendarProvider({ children, users, initialEvents = [], initialView = 'month' }: CalendarProviderProps) {
  const { data: session } = useSession()
  const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>("colored")
  const [visibleHours, setVisibleHours] = useState<TVisibleHours>(VISIBLE_HOURS)
  const [workingHours, setWorkingHours] = useState<TWorkingHours>(WORKING_HOURS)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"] | "all">("all")

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [view, setView] = useState<TCalendarView>(initialView)
  const [showVolunteerTimeslots, setShowVolunteerTimeslots] = useState(true)
  // This localEvents doesn't need to exists in a real scenario.
  // It's used here just to simulate the update of the events.
  // In a real scenario, the events would be updated in the backend
  // and the request that fetches the events should be refetched
  // const [localEvents, setLocalEvents] = useState<IEvent[]>(events)

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
  }

  // Get volunteer calendar data
  const {
    volunteerEvents,
    loading: volunteerLoading,
    refetch: refreshVolunteerTimeslots
  } = useVolunteerCalendar()

  const isVolunteer = !!session?.user && volunteerEvents.length > 0

  // Combine regular events with volunteer events
  const allEvents = showVolunteerTimeslots
    ? [...events, ...volunteerEvents]
    : events

  useEffect(() => {
    // If user is a volunteer and no specific user is selected, show their timeslots
    if (isVolunteer && selectedUserId === "all" && showVolunteerTimeslots) {
      // Keep showing all events but highlight volunteer's timeslots
    }
  }, [isVolunteer, selectedUserId, showVolunteerTimeslots])

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate: handleSelectDate,
        selectedUserId,
        setSelectedUserId,
        badgeVariant,
        setBadgeVariant,
        users,
        visibleHours,
        setVisibleHours,
        workingHours,
        setWorkingHours,
        events: allEvents, // Combined events
        setEvents,
        view,
        setView,
        volunteerEvents,
        showVolunteerTimeslots,
        setShowVolunteerTimeslots,
        isVolunteer,
        volunteerLoading,
        refreshVolunteerTimeslots
        // If you go to the refetch approach, you can remove the localEvents and pass the events directly
        // events: localEvents,
        // setLocalEvents,

      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext)
  if (!context) throw new Error("useCalendar must be used within a CalendarProvider.")
  return context
}