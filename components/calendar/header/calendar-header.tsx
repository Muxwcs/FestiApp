import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange, User, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

import { UserSelect } from "./user-select"
import { TodayButton } from "./today-button"
import { DateNavigator } from "./date-navigator"
import { AddEventDialog } from "../dialogs/add-event-dialog"

import { IEvent } from "../interfaces"
import { TCalendarView } from "../types"
import { useCalendarStore } from "@/stores/calendarStore"

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
    volunteerTimeslots,
    volunteerLoading,
    refreshVolunteerTimeslots
  } = useCalendarStore()

  const volunteerTimeslotsCount = volunteerTimeslots?.length || 0

  return (
    <div className="border-b">
      {/* Main Header Row */}
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section: Date Navigation */}
        <div className="flex items-center gap-3">
          <TodayButton />
          <DateNavigator view={view} events={events} />
        </div>

        {/* Right Section: Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* View Toggle Buttons - Full width on mobile, auto on desktop */}
          <div className="flex w-full sm:w-auto">
            <Button
              aria-label="View by day"
              size="icon"
              variant={view === "day" ? "default" : "outline"}
              className="flex-1 sm:flex-initial rounded-r-none"
              onClick={() => setView("day")}
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              aria-label="View by week"
              size="icon"
              variant={view === "week" ? "default" : "outline"}
              className="flex-1 sm:flex-initial -ml-px rounded-none"
              onClick={() => setView("week")}
            >
              <Columns className="h-4 w-4" />
            </Button>

            <Button
              aria-label="View by month"
              size="icon"
              variant={view === "month" ? "default" : "outline"}
              className="flex-1 sm:flex-initial -ml-px rounded-none"
              onClick={() => setView("month")}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>

            <Button
              aria-label="View by year"
              size="icon"
              variant={view === "year" ? "default" : "outline"}
              className="flex-1 sm:flex-initial -ml-px rounded-none"
              onClick={() => setView("year")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>

            <Button
              aria-label="View by agenda"
              size="icon"
              variant={view === "agenda" ? "default" : "outline"}
              className="flex-1 sm:flex-initial -ml-px rounded-l-none"
              onClick={() => setView("agenda")}
            >
              <CalendarRange className="h-4 w-4" />
            </Button>
          </div>

          {/* User Select and Add Event - Stacked on mobile, inline on desktop */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <UserSelect />

            <AddEventDialog>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="sm:hidden">Ajouter un événement</span>
                <span className="hidden sm:inline">Add Event</span>
              </Button>
            </AddEventDialog>
          </div>
        </div>
      </div>

      {/* Volunteer Controls - Separate row for better mobile experience */}
      {isVolunteer && (
        <div className="border-t bg-green-50/50 px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Toggle Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  id="volunteer-timeslots"
                  checked={showVolunteerTimeslots}
                  onCheckedChange={setShowVolunteerTimeslots}
                  className="data-[state=checked]:bg-green-600"
                />
                <label
                  htmlFor="volunteer-timeslots"
                  className="text-sm font-medium flex items-center gap-2 cursor-pointer"
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
                className="h-8 px-3"
                title="Actualiser mes créneaux"
              >
                <RefreshCw className={`h-3 w-3 ${volunteerLoading ? 'animate-spin' : ''}`} />
                <span className="ml-1 hidden sm:inline">Actualiser</span>
              </Button>
            </div>

            {/* Status Indicator - Responsive positioning */}
            {showVolunteerTimeslots && volunteerTimeslotsCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">
                  <span className="sm:hidden">
                    {volunteerTimeslotsCount} créneau{volunteerTimeslotsCount > 1 ? 'x' : ''}
                  </span>
                  <span className="hidden sm:inline">
                    {volunteerTimeslotsCount} créneau{volunteerTimeslotsCount > 1 ? 'x' : ''} assigné{volunteerTimeslotsCount > 1 ? 's' : ''}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}