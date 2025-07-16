import { CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { User, RefreshCw, Clock, Filter, LayoutGrid, Table as TableIcon } from "lucide-react"
import { ViewMode, VolunteersHeaderProps } from "./type"

const VolunteersHeader = ({
  sectorName,
  viewMode,
  onViewModeChange,
  selectedTimeslot,
  onTimeslotChange,
  timeslotGroups,
  volunteers,
  filteredVolunteersCount,
  onRefresh,
  timeslotStats
}: VolunteersHeaderProps) => {
  const totalVolunteersInTables = timeslotGroups.reduce((total, group) => total + group.count, 0)
  const totalVolunteersNeeded = timeslotGroups.reduce((total, group) => total + (group?.totalVolunteers ?? 0), 0)

  console.log(timeslotGroups)

  return (
    <CardHeader>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle className="text-lg sm:text-xl flex items-center">
          <User className="h-5 w-5 mr-2" />
          Bénévoles assignés
          {sectorName && <span className="text-sm font-normal ml-2">({sectorName})</span>}
        </CardTitle>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            {viewMode === "tables" ? totalVolunteersInTables : filteredVolunteersCount} / {totalVolunteersNeeded} bénévole{volunteers.length !== 1 ? 's' : ''}
          </Badge>
          {timeslotStats && (
            <Badge variant="outline" className="text-xs">
              {timeslotStats.totalTimeslots} créneaux
            </Badge>
          )}
          <Button onClick={onRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && onViewModeChange(value as ViewMode)}
          className="justify-start"
        >
          <ToggleGroupItem value="cards" aria-label="Vue cartes" className="flex items-center space-x-2">
            <LayoutGrid className="h-4 w-4" />
            <span>Cartes</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="tables" aria-label="Vue tableaux" className="flex items-center space-x-2">
            <TableIcon className="h-4 w-4" />
            <span>Tableaux</span>
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Timeslot Filter - Only show for cards view */}
        {viewMode === "cards" && timeslotGroups.length > 0 && (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtrer :</span>
            <Select value={selectedTimeslot} onValueChange={onTimeslotChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les créneaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Tous les créneaux ({volunteers.length})</span>
                  </div>
                </SelectItem>
                {timeslotGroups.map((group) => (
                  <SelectItem key={group.timeslot} value={group.timeslot}>
                    <div className="flex items-center justify-between space-x-2">
                      <span>{group.timeslot}</span>
                      <Badge variant="secondary" className="text-xs">
                        {group.count}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </CardHeader>
  )
}

export default VolunteersHeader 