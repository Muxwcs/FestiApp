"use client"

import { useMemo } from "react"
import { isSameDay } from "date-fns"

import { useCalendarStore, useCalendarStoreHydrated } from "@/stores/calendarStore"

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
  const hydrated = useCalendarStoreHydrated()

  const {
    getSelectedDate,
    selectedUserId,
    getFilteredEvents,
    showVolunteerTimeslots,
    // ✅ Removed unused 'loading' variable
    // ✅ Removed unused 'getAllEvents'
  } = useCalendarStore()

  // ✅ Filter events based on current view and selection
  const filteredEvents = useMemo(() => {
    if (!hydrated) return []
    // ✅ Moved selectedDate inside useMemo to fix dependency issue
    const selectedDate = getSelectedDate()
    return getFilteredEvents(view, selectedDate, selectedUserId)
  }, [hydrated, getFilteredEvents, view, selectedUserId, getSelectedDate]) // ✅ Added getSelectedDate to dependencies

  // ✅ Separate single and multi-day events
  const singleDayEvents = useMemo(() => {
    if (!hydrated) return []
    return filteredEvents.filter(event => {
      const startDate = new Date(event.startDate)
      const endDate = new Date(event.endDate)
      return isSameDay(startDate, endDate)
    })
  }, [hydrated, filteredEvents])

  const multiDayEvents = useMemo(() => {
    if (!hydrated) return []
    return filteredEvents.filter(event => {
      const startDate = new Date(event.startDate)
      const endDate = new Date(event.endDate)
      return !isSameDay(startDate, endDate)
    })
  }, [hydrated, filteredEvents])

  // ✅ For year view, only show start dates
  const eventStartDates = useMemo(() => {
    if (!hydrated) return []
    return filteredEvents.map(event => ({ ...event, endDate: event.startDate }))
  }, [hydrated, filteredEvents])

  function convertToIEvent<T extends {
    id: string
    user: { id: string; name: string; email: string; avatar?: string }
    title: string
    sectorDescription?: string
    startDate: string
    endDate: string
    color?: TEventColor | string
  }>(events: T[]): IEvent[] {
    return events.map((event, index): IEvent => ({
      id: index + 1,
      originalId: event.id,
      title: event.title,
      description: 'sectorDescription' in event ? (event.sectorDescription as string) ?? "" : "",
      place: 'sectorName' in event ? (event.sectorName as string) ?? "" : "",
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

  // ✅ Show loading until hydrated
  if (!hydrated) {
    return (
      <div className="overflow-hidden rounded-xl border w-full">
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading calendar...</div>
        </div>
      </div>
    )
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

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-2 bg-blue-50 border-t text-xs text-blue-700">
          <div className="flex items-center justify-between">
            <span>🔧 Dev: {filteredEvents.length} events</span>
            <span>Toggle: {showVolunteerTimeslots ? 'ON' : 'OFF'} | User: {selectedUserId}</span>
          </div>
        </div>
      )}
    </div>
  )
}