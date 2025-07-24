"use client"

import { useMemo } from "react"
import { isSameDay, parseISO } from "date-fns"

import { useCalendar } from "./context/calendar-context"

import { DndProviderWrapper } from "./dnd/dnd-provider"

import { CalendarHeader } from "./header/calendar-header"
import { CalendarYearView } from "./year-view/calendar-year-view"
import { CalendarMonthView } from "./month-view/calendar-month-view"
import { CalendarAgendaView } from "./agenda-view/calendar-agenda-view"
import { CalendarDayView } from "./week-and-day-view/calendar-day-view"
import { CalendarWeekView } from "./week-and-day-view/calendar-week-view"

import { TCalendarView, TEventColor } from "./types"

interface IProps {
  view: TCalendarView
}

// ✅ Add proper interface for the converted event
import type { IEvent as CalendarIEvent } from "./interfaces"

interface IEvent extends CalendarIEvent {
  originalId: string
  variant?: "default" | "dot"
  isVolunteerTimeslot?: boolean
  sectorName?: string
  status?: "Validé" | "En attente" | "Refusé" | "Annulé"
  role?: string
  capacity?: string
}

export function ClientContainer({ view }: IProps) {
  const {
    selectedDate,
    selectedUserId,
    events, // Now includes volunteer events from context
    isVolunteer,
    showVolunteerTimeslots,
    volunteerEvents
  } = useCalendar()

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventStartDate = parseISO(event.startDate)
      const eventEndDate = parseISO(event.endDate)

      // First, check date range based on view
      let dateMatch = false

      if (view === "year") {
        const yearStart = new Date(selectedDate.getFullYear(), 0, 1)
        const yearEnd = new Date(selectedDate.getFullYear(), 11, 31, 23, 59, 59, 999)
        dateMatch = eventStartDate <= yearEnd && eventEndDate >= yearStart
      } else if (view === "month" || view === "agenda") {
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59, 999)
        dateMatch = eventStartDate <= monthEnd && eventEndDate >= monthStart
      } else if (view === "week") {
        const dayOfWeek = selectedDate.getDay()
        const weekStart = new Date(selectedDate)
        weekStart.setDate(selectedDate.getDate() - dayOfWeek)
        weekStart.setHours(0, 0, 0, 0)

        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        weekEnd.setHours(23, 59, 59, 999)

        dateMatch = eventStartDate <= weekEnd && eventEndDate >= weekStart
      } else if (view === "day") {
        const dayStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0)
        const dayEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59)
        dateMatch = eventStartDate <= dayEnd && eventEndDate >= dayStart
      }

      if (!dateMatch) return false

      // Enhanced user filtering to handle volunteer timeslots
      if (selectedUserId === "all") {
        // Show all events when "all" is selected
        return true
      }

      // Handle volunteer timeslots with special logic
      if (event.isVolunteerTimeslot) {
        // If this is a volunteer timeslot and user is a volunteer with timeslots enabled
        if (isVolunteer && showVolunteerTimeslots) {
          // Always show volunteer's own timeslots regardless of selectedUserId
          return true
        }
        // If volunteer timeslots are disabled, don't show them
        if (!showVolunteerTimeslots) {
          return false
        }
        // If not the current volunteer's timeslot, treat as regular event
        return event.user.id === selectedUserId
      }

      // Regular user filtering for non-volunteer events
      return event.user.id === selectedUserId
    })
  }, [selectedDate, selectedUserId, events, view, isVolunteer, showVolunteerTimeslots])

  // Separate single and multi-day events for different view components
  const singleDayEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const startDate = parseISO(event.startDate)
      const endDate = parseISO(event.endDate)
      return isSameDay(startDate, endDate)
    })
  }, [filteredEvents])

  const multiDayEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const startDate = parseISO(event.startDate)
      const endDate = parseISO(event.endDate)
      return !isSameDay(startDate, endDate)
    })
  }, [filteredEvents])

  // For year view, we only care about the start date
  // by using the same date for both start and end,
  // we ensure only the start day will show a dot
  const eventStartDates = useMemo(() => {
    return filteredEvents.map(event => ({ ...event, endDate: event.startDate }))
  }, [filteredEvents])

  // Get volunteer events count for debugging/info
  const volunteerEventsInView = useMemo(() => {
    return filteredEvents.filter(event => event.isVolunteerTimeslot).length
  }, [filteredEvents])

  // Log volunteer events info (can be removed in production)
  if (process.env.NODE_ENV === 'development' && isVolunteer) {
    console.log('Calendar container - Volunteer events:', {
      totalEvents: events.length,
      volunteerEvents: volunteerEvents.length,
      filteredEvents: filteredEvents.length,
      volunteerEventsInView,
      showVolunteerTimeslots,
      selectedUserId,
      view
    })
  }

  // // Simpler version - just use a counter
  // function convertToIEvent<T extends { id: string; user: { id: string } }>(events: T[]): IEvent[] {
  //   return events.map((event, index) => ({
  //     ...event,
  //     id: index + 1, // Simple incremental ID
  //     originalId: event.id,
  //     user: {
  //       ...event.user,
  //       id: parseInt(event.user.id, 10) || (index + 1000), // User ID with offset
  //       originalId: event.user.id,
  //     },
  //   })) as IEvent[]
  // }

  // ✅ Alternative without type assertion
  // function convertToIEvent<T extends { 
  //   id: string; 
  //   user: { id: string; name: string; email: string; avatar?: string };
  //   title: string;
  //   startDate: string;
  //   endDate: string;
  // }>(events: T[]): IEvent[] {
  //   return events.map((event, index): IEvent => ({
  //     id: index + 1,
  //     originalId: event.id,
  //     title: event.title,
  //     description: 'description' in event ? (event.description as string | undefined) : undefined,
  //     startDate: event.startDate,
  //     endDate: event.endDate,
  //     user: {
  //       id: parseInt(event.user.id, 10) || (index + 1000),
  //       originalId: event.user.id,
  //       name: event.user.name,
  //       email: event.user.email,
  function convertToIEvent<T extends {
    id: string
    user: { id: string; name: string; email: string; avatar?: string }
    title: string
    startDate: string
    endDate: string
    color?: TEventColor | string
  }>(events: T[]): IEvent[] {
    return events.map((event, index): IEvent => ({
      id: index + 1,
      originalId: event.id,
      title: event.title,
      description: 'description' in event ? (event.description as string) ?? "" : "",
      startDate: event.startDate,
      endDate: event.endDate,
      user: {
        id: event.user.id ? String(event.user.id) : String(index + 1000),
        name: event.user.name,

      },
      color: (('color' in event && event.color) ? event.color : "default") as TEventColor,
      variant: 'variant' in event ? (event.variant as "default" | "dot" | undefined) : undefined,
      isVolunteerTimeslot: 'isVolunteerTimeslot' in event ? (event.isVolunteerTimeslot as boolean | undefined) : undefined,
      sectorName: 'sectorName' in event ? (event.sectorName as string | undefined) : undefined,
      status: 'status' in event ? (event.status as "Validé" | "En attente" | "Refusé" | "Annulé" | undefined) : undefined,
      role: 'role' in event ? (event.role as string | undefined) : undefined,
      capacity: 'capacity' in event ? (event.capacity as string | undefined) : undefined,
    }))
  }
  // ✅ Debug: Log ID conversions in development
  if (process.env.NODE_ENV === 'development') {
    const convertedEvents = convertToIEvent(filteredEvents)
    const ids = convertedEvents.map(e => e.id)
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)

    if (duplicateIds.length > 0) {
      console.warn('⚠️ Duplicate IDs found after conversion:', duplicateIds)
      console.log('Original events causing duplicates:',
        filteredEvents.filter((_, index) => duplicateIds.includes(convertedEvents[index].id))
      )
    }
  }
  return (
    <div className="overflow-hidden rounded-xl border w-full">
      <CalendarHeader view={view} events={convertToIEvent(filteredEvents)} />
      <DndProviderWrapper>
        {view === "day" && (
          <CalendarDayView
            singleDayEvents={convertToIEvent(singleDayEvents)}
            multiDayEvents={convertToIEvent(multiDayEvents)}
          />
        )}
        {view === "month" && (
          <CalendarMonthView
            singleDayEvents={convertToIEvent(singleDayEvents)}
            multiDayEvents={convertToIEvent(multiDayEvents)}
          />
        )}
        {view === "week" && (
          <CalendarWeekView
            singleDayEvents={convertToIEvent(singleDayEvents)}
            multiDayEvents={convertToIEvent(multiDayEvents)}
          />
        )}
        {view === "year" && (
          <CalendarYearView
            allEvents={convertToIEvent(eventStartDates)}
          />
        )}
        {view === "agenda" && (
          <CalendarAgendaView
            singleDayEvents={convertToIEvent(singleDayEvents)}
            multiDayEvents={convertToIEvent(multiDayEvents)}
          />
        )}
      </DndProviderWrapper>

      {/* Debug info for development (remove in production) */}
      {process.env.NODE_ENV === 'development' && isVolunteer && (
        <div className="p-2 bg-green-50 border-t text-xs text-green-700">
          <div className="flex items-center justify-between">
            <span>
              🔧 Dev: {filteredEvents.length} events ({volunteerEventsInView} volunteer)
            </span>
            <span>
              Toggle: {showVolunteerTimeslots ? 'ON' : 'OFF'} | User: {selectedUserId}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}