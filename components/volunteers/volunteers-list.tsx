import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { VolunteerRecord } from "@/types/user.interface"
import { VolunteersListProps, VolunteerWithAffectations, TimeslotGroup, ViewMode, TimeslotDetails } from "./type"
import { VolunteersCardView } from "./volunteers-card-view"
import { VolunteersTableView } from "./volunteers-table-view"
import VolunteersLoading from "./volunteers-loading"
import VolunteersError from "./volunteers-error"
import VolunteersHeader from "./volunteers-header"

export const VolunteersList = ({ sectorId, sectorName }: VolunteersListProps) => {
  const [volunteers, setVolunteers] = useState<VolunteerWithAffectations[]>([])
  const [timeslots, setTimeslots] = useState<Record<string, string>>({})
  const [allTimeslots, setAllTimeslots] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>("all")
  const [timeslotGroups, setTimeslotGroups] = useState<TimeslotGroup[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [allTimeslotDetails, setAllTimeslotDetails] = useState<Record<string, TimeslotDetails>>({})

  const fetchVolunteers = useCallback(async () => {
    setLoading(true)
    setError(null)

    // Move processTimeslots inside fetchVolunteers to avoid dependency issues
    const processTimeslots = (
      volunteerData: VolunteerWithAffectations[],
      timeslotMap: Record<string, string>,
      allSectorTimeslots: Record<string, TimeslotDetails | string>,
      timeslotDetails: Record<string, TimeslotDetails>
    ) => {
      if (!Array.isArray(volunteerData)) {
        console.warn('volunteerData is not an array:', volunteerData)
        setTimeslotGroups([])
        return
      }

      const timeslotGroupMap = new Map<string, VolunteerWithAffectations[]>()

      // Initialize ALL sector timeslots (even empty ones) for table view
      Object.entries(allSectorTimeslots).forEach(([, details]) => {
        const timeslotName = typeof details === 'string' ? details : details.name
        if (timeslotName && !timeslotGroupMap.has(timeslotName)) {
          timeslotGroupMap.set(timeslotName, [])
        }
      })

      // Add volunteers to their timeslots
      volunteerData.forEach(volunteer => {
        if (volunteer.affectations && Array.isArray(volunteer.affectations)) {
          volunteer.affectations.forEach(affectation => {
            const timeslotNames = affectation.timeslotNames || []

            if (timeslotNames.length > 0) {
              timeslotNames.forEach(timeslotName => {
                if (timeslotName && typeof timeslotName === 'string') {
                  if (!timeslotGroupMap.has(timeslotName)) {
                    timeslotGroupMap.set(timeslotName, [])
                  }

                  const existingVolunteers = timeslotGroupMap.get(timeslotName)!
                  if (!existingVolunteers.find(v => v.id === volunteer.id)) {
                    existingVolunteers.push(volunteer)
                  }
                }
              })
            }
          })
        }
      })

      // Convert to array and sort with enhanced details
      const groups = Array.from(timeslotGroupMap.entries())
        .map(([timeslot, volunteers]) => {
          const timeslotId = Object.keys(allSectorTimeslots).find(id => {
            const details = allSectorTimeslots[id]
            return (typeof details === 'string' ? details : details.name) === timeslot
          }) || ''

          const details = timeslotId ? allSectorTimeslots[timeslotId] : null

          return {
            timeslot,
            timeslotId,
            volunteers,
            count: volunteers.length,
            dateStart: typeof details === 'object' && details ? details.dateStart : undefined,
            dateEnd: typeof details === 'object' && details ? details.dateEnd : undefined,
            totalVolunteers: typeof details === 'object' && details ? details.totalVolunteers : undefined,
          }
        })
        .sort((a, b) => {
          // Sort by date first, then by name
          if (a.dateStart && b.dateStart) {
            return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
          }
          return a.timeslot.localeCompare(b.timeslot)
        })

      console.log('Processed timeslot groups:', groups)
      console.log('Available timeslots:', timeslotMap)
      console.log('All timeslots:', allSectorTimeslots)
      console.log('Timeslot details:', timeslotDetails)
      setTimeslotGroups(groups)
    }

    try {
      const response = await fetch(`/api/txands/${sectorId}/volunteers`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)

      // Handle both old and new API response format
      if (Array.isArray(data)) {
        setVolunteers(data)
        setTimeslots({})
        setAllTimeslots({})
        setAllTimeslotDetails({})
        processTimeslots(data, {}, {}, {})
      } else if (data && data.volunteers) {
        setVolunteers(data.volunteers || [])
        setTimeslots(data.timeslots || {})

        const allSectorTimeslots = data.allSectorTimeslots || {}
        const processedAllTimeslots = Object.fromEntries(
          Object.entries(allSectorTimeslots as Record<string, TimeslotDetails | string>)
            .map(([id, details]) => [
              id,
              typeof details === "string"
                ? details
                : (details && typeof details === "object" && "name" in details && details.name)
                  ? String(details.name)
                  : ""
            ])
        )

        setAllTimeslots(processedAllTimeslots)
        setAllTimeslotDetails(allSectorTimeslots)

        processTimeslots(
          data.volunteers || [],
          data.timeslots || {},
          allSectorTimeslots,
          allSectorTimeslots
        )
      } else {
        setVolunteers([])
        setTimeslots({})
        setAllTimeslots({})
        setAllTimeslotDetails({})
        setTimeslotGroups([])
      }
    } catch (err) {
      console.error("Error fetching volunteers:", err)
      setError("Erreur lors du chargement des bénévoles")
      toast.error("Erreur lors du chargement des bénévoles")
      setVolunteers([])
      setTimeslots({})
      setAllTimeslots({})
      setAllTimeslotDetails({})
      setTimeslotGroups([])
    } finally {
      setLoading(false)
    }
  }, [sectorId]) // Only sectorId dependency now!

  const getDisplayName = (volunteer: VolunteerRecord) => {
    if (volunteer.fields.surname) {
      return `${volunteer.fields.surname} (${volunteer.fields.firstname || ""} ${volunteer.fields.name || ""})`.trim()
    } else if (volunteer.fields.firstname || volunteer.fields.name) {
      return `${volunteer.fields.firstname || ""} ${volunteer.fields.name || ""}`.trim()
    }
    return "Sans nom"
  }

  const getFilteredVolunteers = () => {
    if (!Array.isArray(volunteers)) {
      console.warn('volunteers is not an array:', volunteers)
      return []
    }

    if (selectedTimeslot === "all") {
      return volunteers
    }

    const selectedGroup = timeslotGroups.find(group => group.timeslot === selectedTimeslot)
    return selectedGroup ? selectedGroup.volunteers : []
  }

  // Get timeslot statistics for debugging/info display
  const getTimeslotStats = () => {
    return {
      totalTimeslots: Object.keys(allTimeslots).length,
      timelsotsWithVolunteers: Object.keys(timeslots).length,
      detailedTimeslots: Object.keys(allTimeslotDetails).length,
      volunteerCount: volunteers.length
    }
  }

  useEffect(() => {
    fetchVolunteers()
  }, [fetchVolunteers])

  // Loading state
  if (loading) {
    return <VolunteersLoading sectorName={sectorName} />
  }

  // Error state
  if (error) {
    return <VolunteersError error={error} onRetry={fetchVolunteers} />
  }

  const filteredVolunteers = getFilteredVolunteers()
  const stats = getTimeslotStats()

  return (
    <Card className="w-full">
      <VolunteersHeader
        sectorName={sectorName}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedTimeslot={selectedTimeslot}
        onTimeslotChange={setSelectedTimeslot}
        timeslotGroups={timeslotGroups}
        volunteers={volunteers}
        filteredVolunteersCount={filteredVolunteers.length}
        onRefresh={fetchVolunteers}
        timeslotStats={stats}
      />

      <CardContent>
        {viewMode === "tables" ? (
          <VolunteersTableView
            volunteers={volunteers}
            timeslotGroups={timeslotGroups}
            selectedTimeslot={selectedTimeslot}
            getDisplayName={getDisplayName}
            allTimeslots={allTimeslots}
            timeslotDetails={allTimeslotDetails}
          />
        ) : (
          <VolunteersCardView
            volunteers={volunteers}
            timeslotGroups={timeslotGroups}
            selectedTimeslot={selectedTimeslot}
            getDisplayName={getDisplayName}
            timeslots={timeslots}
            allTimeslotDetails={allTimeslotDetails}
          />
        )}
      </CardContent>
    </Card>
  )
}