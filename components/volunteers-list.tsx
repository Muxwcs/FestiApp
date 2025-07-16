import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { User, Mail, Phone, RefreshCw, ExternalLink, Clock, Filter, LayoutGrid, Table as TableIcon, Users } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { VolunteerRecord } from "@/types/user.interface"

interface VolunteersListProps {
  sectorId: string
  sectorName?: string
}

interface VolunteerWithAffectations extends VolunteerRecord {
  affectations?: Array<{
    id: string
    fields: any
    timeslotNames?: string[]
  }>
}

interface ApiResponse {
  volunteers: VolunteerWithAffectations[]
  timeslots: Record<string, string>
  allSectorTimeslots: Record<string, string> // Add this
  totalTimeslots: number
}

interface TimeslotGroup {
  timeslot: string
  timeslotId: string
  volunteers: VolunteerWithAffectations[]
  count: number
}

type ViewMode = "cards" | "tables"

export const VolunteersList = ({ sectorId, sectorName }: VolunteersListProps) => {
  const [volunteers, setVolunteers] = useState<VolunteerWithAffectations[]>([])
  const [timeslots, setTimeslots] = useState<Record<string, string>>({})
  const [allTimeslots, setAllTimeslots] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>("all")
  const [timeslotGroups, setTimeslotGroups] = useState<TimeslotGroup[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

  const fetchVolunteers = async () => {
    setLoading(true)
    setError(null)

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
        processTimeslots(data, {}, {})
      } else if (data && data.volunteers) {
        setVolunteers(data.volunteers || [])
        setTimeslots(data.timeslots || {})
        // Use allSectorTimeslots if available, fallback to timeslots
        setAllTimeslots(data.allSectorTimeslots || data.timeslots || {})
        processTimeslots(
          data.volunteers || [],
          data.timeslots || {},
          data.allSectorTimeslots || data.timeslots || {}
        )
      } else {
        setVolunteers([])
        setTimeslots({})
        setAllTimeslots({})
        setTimeslotGroups([])
      }
    } catch (err) {
      console.error("Error fetching volunteers:", err)
      setError("Erreur lors du chargement des bénévoles")
      toast.error("Erreur lors du chargement des bénévoles")
      setVolunteers([])
      setTimeslots({})
      setAllTimeslots({})
      setTimeslotGroups([])
    } finally {
      setLoading(false)
    }
  }

  const processTimeslots = (
    volunteerData: VolunteerWithAffectations[],
    timeslotMap: Record<string, string>,
    allSectorTimeslots: Record<string, string>
  ) => {
    if (!Array.isArray(volunteerData)) {
      console.warn('volunteerData is not an array:', volunteerData)
      setTimeslotGroups([])
      return
    }

    const timeslotGroupMap = new Map<string, VolunteerWithAffectations[]>()

    // Initialize ALL sector timeslots (even empty ones) for table view
    Object.values(allSectorTimeslots).forEach(timeslotName => {
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

    // Convert to array and sort
    const groups = Array.from(timeslotGroupMap.entries())
      .map(([timeslot, volunteers]) => ({
        timeslot,
        timeslotId: Object.keys(allSectorTimeslots).find(id => allSectorTimeslots[id] === timeslot) || '',
        volunteers,
        count: volunteers.length
      }))
      .sort((a, b) => a.timeslot.localeCompare(b.timeslot))

    console.log('Processed timeslot groups:', groups)
    setTimeslotGroups(groups)
  }

  useEffect(() => {
    fetchVolunteers()
  }, [sectorId])

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

  const filteredVolunteers = getFilteredVolunteers()

  // Render table view
  const renderTableView = () => {
    return (
      <div className="space-y-6">
        {timeslotGroups.map((group) => (
          <Card key={group.timeslot} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  {group.timeslot}
                </CardTitle>
                <Badge variant={group.count > 0 ? "default" : "secondary"} className="text-xs">
                  {group.count} bénévole{group.count !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {group.volunteers.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Aucun bénévole assigné à ce créneau</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Nom</TableHead>
                      <TableHead className="w-[80px]">Rôle</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[120px]">Téléphone</TableHead>
                      <TableHead className="w-[100px]">Statut</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.volunteers.map((volunteer) => {
                      // Get status from affectations for this specific timeslot
                      const relevantAffectations = volunteer.affectations?.filter(aff =>
                        aff.timeslotNames?.includes(group.timeslot)
                      ) || []
                      const status = relevantAffectations[0]?.fields?.status || "Non défini"

                      return (
                        <TableRow key={volunteer.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {getDisplayName(volunteer)}
                          </TableCell>
                          <TableCell>
                            {volunteer.fields.role && (
                              <Badge
                                variant={volunteer.fields.role === "admin" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {volunteer.fields.role}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              {volunteer.fields.email && (
                                <>
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate max-w-[200px]">{volunteer.fields.email}</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              {volunteer.fields.phone && (
                                <>
                                  <Phone className="h-3 w-3" />
                                  <span>{volunteer.fields.phone}</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={status === "Validé" ? "default" : status === "En attente" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link href={`/admin/benevoles/${volunteer.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Render card view (existing implementation)
  const renderCardView = () => {
    if (volunteers.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Aucun bénévole assigné</p>
          <p className="text-sm">Ce secteur n&apos;a pas encore de bénévoles assignés.</p>
        </div>
      )
    }

    if (filteredVolunteers.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Aucun bénévole pour ce créneau</p>
          <p className="text-sm">Aucun bénévole n&apos;est assigné au créneau sélectionné.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {/* Show current filter if not "all" */}
        {selectedTimeslot !== "all" && (
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Créneau : {selectedTimeslot}
            </span>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              {filteredVolunteers.length} bénévole{filteredVolunteers.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        )}

        {filteredVolunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">
                    {getDisplayName(volunteer)}
                  </h3>
                  {volunteer.fields.role && (
                    <Badge variant={volunteer.fields.role === "admin" ? "destructive" : "secondary"}>
                      {volunteer.fields.role}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                  {volunteer.fields.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span className="break-all">{volunteer.fields.email}</span>
                    </div>
                  )}
                  {volunteer.fields.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{volunteer.fields.phone}</span>
                    </div>
                  )}
                </div>

                {/* Show timeslots for this volunteer */}
                {volunteer.affectations && volunteer.affectations.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {volunteer.affectations.map((aff, index) => {
                      const timeslotNames = aff.timeslotNames || []

                      return timeslotNames.map((timeslotName, timeslotIndex) => (
                        <Badge
                          key={`${index}-${timeslotIndex}`}
                          variant="outline"
                          className="text-xs"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {timeslotName}
                        </Badge>
                      ))
                    })}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Link href={`/admin/benevoles/${volunteer.id}`}>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Voir détails
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <User className="h-5 w-5 mr-2" />
            Bénévoles assignés
            {sectorName && <span className="text-sm font-normal ml-2">({sectorName})</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Chargement des bénévoles...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <User className="h-5 w-5 mr-2" />
            Bénévoles assignés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchVolunteers} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <User className="h-5 w-5 mr-2" />
            Bénévoles assignés
            {sectorName && <span className="text-sm font-normal ml-2">({sectorName})</span>}
          </CardTitle>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-sm">
              {viewMode === "tables" ? timeslotGroups.reduce((total, group) => total + group.count, 0) : filteredVolunteers.length} / {volunteers.length} bénévole{volunteers.length !== 1 ? 's' : ''}
            </Badge>
            <Button onClick={fetchVolunteers} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value as ViewMode)}
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
              <Select value={selectedTimeslot} onValueChange={setSelectedTimeslot}>
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

      <CardContent>
        {viewMode === "tables" ? renderTableView() : renderCardView()}
      </CardContent>
    </Card>
  )
}