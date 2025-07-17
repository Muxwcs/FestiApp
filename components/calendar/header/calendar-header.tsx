import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange, User, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { UserSelect } from "./user-select"
import { TodayButton } from "./today-button"
import { DateNavigator } from "./date-navigator"
import { AddEventDialog } from "../dialogs/add-event-dialog"

import { IEvent } from "../interfaces"
import { TCalendarView } from "../types"
import { useCalendar } from "../context/calendar-context"

interface IProps {
  view: TCalendarView
  events: IEvent[]
}

export function CalendarHeader({ view, events }: IProps) {
  const {
    setView,
    isVolunteer,
    showVolunteerTimeslots,
    setShowVolunteerTimeslots,
    volunteerEvents,
    volunteerLoading,
    refreshVolunteerTimeslots
  } = useCalendar()

  const volunteerTimeslotsCount = volunteerEvents?.length || 0

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          {/* View Toggle Buttons */}
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              asChild
              aria-label="View by day"
              size="icon"
              variant={view === "day" ? "default" : "outline"}
              className="rounded-r-none [&_svg]:size-5"
              onClick={() => setView("day")}
            >
              <List className="p-2" />
            </Button>

            <Button
              aria-label="View by week"
              size="icon"
              variant={view === "week" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
              onClick={() => setView("week")}
            >
              <Columns />
            </Button>

            <Button
              aria-label="View by month"
              size="icon"
              variant={view === "month" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
              onClick={() => setView("month")}
            >
              <Grid2x2 />
            </Button>

            <Button
              aria-label="View by year"
              size="icon"
              variant={view === "year" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
              onClick={() => setView("year")}
            >
              <Grid3x3 />
            </Button>

            <Button
              aria-label="View by agenda"
              size="icon"
              variant={view === "agenda" ? "default" : "outline"}
              className="-ml-px rounded-l-none [&_svg]:size-5"
              onClick={() => setView("agenda")}
            >
              <CalendarRange />
            </Button>
          </div>

          <UserSelect />

          {/* Volunteer Controls */}
          {isVolunteer && (
            <>
              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center space-x-3">
                {/* Volunteer Timeslots Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="volunteer-timeslots"
                    checked={showVolunteerTimeslots}
                    onCheckedChange={setShowVolunteerTimeslots}
                    className="data-[state=checked]:bg-green-600"
                  />
                  <label
                    htmlFor="volunteer-timeslots"
                    className="text-sm font-medium flex items-center space-x-1 cursor-pointer"
                  >
                    <User className="h-4 w-4 text-green-600" />
                    <span>Mes créneaux</span>
                    {volunteerTimeslotsCount > 0 && (
                      <Badge
                        variant={showVolunteerTimeslots ? "default" : "secondary"}
                        className="text-xs bg-green-600 hover:bg-green-700"
                      >
                        {volunteerTimeslotsCount}
                      </Badge>
                    )}
                  </label>
                </div>

                {/* Refresh Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshVolunteerTimeslots}
                  disabled={volunteerLoading}
                  className="h-8 px-2"
                  title="Actualiser mes créneaux"
                >
                  <RefreshCw className={`h-3 w-3 ${volunteerLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Add Event Button */}
        <AddEventDialog>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-1" />
            Add Event
          </Button>
        </AddEventDialog>
      </div>

      {/* Volunteer Status Indicator */}
      {isVolunteer && showVolunteerTimeslots && volunteerTimeslotsCount > 0 && (
        <div className="flex items-center justify-center lg:justify-start pt-2 lg:pt-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">
              {volunteerTimeslotsCount} créneau{volunteerTimeslotsCount > 1 ? 'x' : ''} assigné{volunteerTimeslotsCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}