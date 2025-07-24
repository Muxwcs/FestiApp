"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { VolunteerRecord } from "@/types/user.interface"
import {
  VolunteersListProps,
  VolunteerWithAffectations,
  ViewMode,
  TimeslotDetails,
  TimeslotStats
} from "./type"
import { VolunteersCardView } from "./volunteers-card-view"
import { VolunteersTableView } from "./volunteers-table-view"
import VolunteersLoading from "./volunteers-loading"
import VolunteersError from "./volunteers-error"
import VolunteersHeader from "./volunteers-header"

export const VolunteersList = ({ sectorId, sectorName }: VolunteersListProps) => {
  // ✅ Core state
  const [volunteers, setVolunteers] = useState<VolunteerWithAffectations[]>([])
  const [timeslotDetails, setTimeslotDetails] = useState<Record<string, TimeslotDetails>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<number>(0)

  // ✅ UI state
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

  // ✅ Fetch function with better error handling
  const fetchVolunteers = useCallback(async (forceRefresh = false) => {
    // Skip if recently fetched (unless force refresh)
    const now = Date.now()
    if (!forceRefresh && lastFetch && (now - lastFetch) < 30000) { // 30 seconds
      console.log('⏭️ Skipping fetch - too recent')
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log(`📡 Fetching volunteers for sector: ${sectorId}`)

      const response = await fetch(`/api/txands/${sectorId}/volunteers`, {
        headers: {
          'Cache-Control': forceRefresh ? 'no-cache' : 'default'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ API Response received:', {
        volunteers: data.volunteers?.length || 0,
        timeslots: Object.keys(data.allSectorTimeslots || {}).length,
        totalTimeslots: data.totalTimeslots
      })

      // ✅ Update state with clean data
      setVolunteers(data.volunteers || [])
      setTimeslotDetails(data.allSectorTimeslots || {})
      setLastFetch(now)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('❌ Fetch error:', err)
      setError(errorMessage)
      toast.error('Erreur lors du chargement des bénévoles')
    } finally {
      setLoading(false)
    }
  }, [sectorId, lastFetch])

  // ✅ Process timeslot groups with memoization
  const timeslotGroups = useMemo(() => {
    if (!volunteers.length || !Object.keys(timeslotDetails).length) {
      return []
    }

    const groupMap = new Map<string, VolunteerWithAffectations[]>()

    // Initialize all timeslots (even empty ones)
    Object.values(timeslotDetails).forEach(details => {
      if (details.name) {
        groupMap.set(details.name, [])
      }
    })

    // Add volunteers to their timeslots
    volunteers.forEach(volunteer => {
      if (volunteer.affectations?.length) {
        volunteer.affectations.forEach(affectation => {
          affectation.timeslotNames?.forEach(timeslotName => {
            if (timeslotName) {
              const existing = groupMap.get(timeslotName) || []
              if (!existing.find(v => v.id === volunteer.id)) {
                existing.push(volunteer)
                groupMap.set(timeslotName, existing)
              }
            }
          })
        })
      }
    })

    // Convert to TimeslotGroup array with enhanced details
    return Array.from(groupMap.entries())
      .map(([timeslotName, volunteers]) => {
        const details = Object.values(timeslotDetails).find(d => d.name === timeslotName)

        return {
          timeslot: timeslotName,
          timeslotId: details?.id || '',
          volunteers,
          count: volunteers.length,
          dateStart: details?.dateStart,
          dateEnd: details?.dateEnd,
          totalVolunteers: details?.totalVolunteers
        }
      })
      .sort((a, b) => {
        // Sort by date first, then by name
        if (a.dateStart && b.dateStart) {
          return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
        }
        return a.timeslot.localeCompare(b.timeslot)
      })
  }, [volunteers, timeslotDetails])

  // ✅ Filtered volunteers for card view
  const filteredVolunteers = useMemo(() => {
    if (selectedTimeslot === "all") {
      return volunteers
    }

    const selectedGroup = timeslotGroups.find(group => group.timeslot === selectedTimeslot)
    return selectedGroup?.volunteers || []
  }, [volunteers, timeslotGroups, selectedTimeslot])

  // ✅ Statistics
  const timeslotStats = useMemo((): TimeslotStats => {
    return {
      totalTimeslots: Object.keys(timeslotDetails).length,
      timelsotsWithVolunteers: timeslotGroups.filter(g => g.count > 0).length,
      detailedTimeslots: timeslotGroups.length,
      volunteerCount: volunteers.length
    }
  }, [timeslotDetails, timeslotGroups, volunteers])

  // ✅ Utility function
  const getDisplayName = useCallback((volunteer: VolunteerRecord): string => {
    if (volunteer.fields.surname) {
      return `${volunteer.fields.surname} (${volunteer.fields.firstname || ""} ${volunteer.fields.name || ""})`.trim()
    }
    if (volunteer.fields.firstname || volunteer.fields.name) {
      return `${volunteer.fields.firstname || ""} ${volunteer.fields.name || ""}`.trim()
    }
    return "Sans nom"
  }, [])

  // ✅ Initial fetch
  useEffect(() => {
    fetchVolunteers()
  }, [fetchVolunteers])

  // ✅ Handle refresh
  const handleRefresh = useCallback(() => {
    fetchVolunteers(true)
  }, [fetchVolunteers])

  // ✅ Reset timeslot filter when switching views
  useEffect(() => {
    if (viewMode === "tables") {
      setSelectedTimeslot("all")
    }
  }, [viewMode])

  // ✅ Loading state
  if (loading && !volunteers.length) {
    return <VolunteersLoading sectorName={sectorName} />
  }

  // ✅ Error state
  if (error && !volunteers.length) {
    return <VolunteersError error={error} onRetry={handleRefresh} />
  }

  // ✅ Main render
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
        onRefresh={handleRefresh}
        timeslotStats={timeslotStats}
      />

      <CardContent>
        {/* Loading overlay for refreshes */}
        {loading && volunteers.length > 0 && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg">
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full" />
              <span className="text-sm">Actualisation...</span>
            </div>
          </div>
        )}

        {/* Error banner for refresh errors */}
        {error && volunteers.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Content */}
        {viewMode === "tables" ? (
          <VolunteersTableView
            volunteers={volunteers}
            timeslotGroups={timeslotGroups}
            selectedTimeslot={selectedTimeslot}
            getDisplayName={getDisplayName}
            timeslotDetails={timeslotDetails}
            allTimeslotDetails={timeslotDetails}
          />
        ) : (
          <VolunteersCardView
            volunteers={filteredVolunteers}
            timeslotGroups={timeslotGroups}
            selectedTimeslot={selectedTimeslot}
            getDisplayName={getDisplayName}
            timeslots={{}}
            allTimeslotDetails={timeslotDetails}
          />
        )}
      </CardContent>
    </Card>
  )
}