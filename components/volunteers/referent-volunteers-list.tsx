"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Search, User, Phone, Mail } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { ReferentVolunteersTableView } from "./referent-volunteers-table-view"

interface VolunteerData {
  id: string
  fields: {
    name?: string
    firstname?: string
    email?: string
    phone?: string
    status?: string
    skills?: string[]
    availability?: string[]
  }
}

interface ReferentVolunteersListProps {
  sectorId: string
  sectorName: string
  isReferentView?: boolean
  useReferentAPI?: boolean
}

export const ReferentVolunteersList = ({ sectorId, sectorName, isReferentView = false, useReferentAPI = false }: ReferentVolunteersListProps) => {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { data: session } = useSession()

  const [timeslotGroups, setTimeslotGroups] = useState<any[]>([])

  // ✅ Fetch volunteers specifically for this sector
  const fetchSectorVolunteers = async () => {
    try {
      setLoading(true)
      setError(null)

      // ✅ Smart route detection
      let url: string

      if (sectorId) {
        // ✅ If explicitly set to use referent API or user is a referent (not admin)
        const shouldUseReferentAPI = useReferentAPI ||
          (session?.user?.isReferent && session?.user?.role !== 'admin')

        if (shouldUseReferentAPI) {
          url = `/api/referent/${sectorId}/volunteers`
        } else {
          url = `/api/txands/${sectorId}/volunteers`  // Admin route
        }
      } else {
        url = `/api/volunteers`  // General volunteers
      }

      console.log("🔄 Fetching volunteers from:", url, {
        isReferentView,
        useReferentAPI,
        userRole: session?.user?.role,
        isReferent: session?.user?.isReferent
      })

      // ✅ Call referent-specific API that only returns volunteers for this sector
      const response = await fetch(url)

      if (!response.ok) {
        // ✅ If admin route fails and user is referent, try referent route
        if (response.status === 403 && sectorId && !useReferentAPI && session?.user?.isReferent) {
          console.log("🔄 Admin route failed, trying referent route...")
          return await fetchVolunteersWithReferentAPI()
        }
        if (response.status === 404) {
          throw new Error("Secteur non trouvé")
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("✅ Sector volunteers fetched:", data)

      // ✅ Handle referent API response format
      if (data.volunteers) {
        setVolunteers(data.volunteers)
      } else if (Array.isArray(data)) {
        setVolunteers(data)
      } else {
        setVolunteers([])
      }

    } catch (err) {
      console.error("❌ Error fetching sector volunteers:", err)
      const errorMessage = err instanceof Error ? err.message : "Erreur lors du chargement"
      setError(errorMessage)
      setVolunteers([])
      // setTotal(0)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Fallback function to use referent API
  const fetchVolunteersWithReferentAPI = async () => {
    if (!sectorId) return

    console.log("🔄 Using referent API fallback for sector:", sectorId)

    const response = await fetch(`/api/referent/${sectorId}/volunteers`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log("✅ Volunteers fetched via referent API:", data)

    if (data.volunteers) {
      setVolunteers(data.volunteers)
      // setTotal(data.total || data.volunteers.length)
    }
  }

  useEffect(() => {
    if (sectorId) {
      fetchSectorVolunteers()
    }
  }, [sectorId, isReferentView, useReferentAPI, session])

  // const handleRefresh = () => {
  //   fetchSectorVolunteers()
  // }
  console.log("timeslotGroups:", timeslotGroups)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/referent/${sectorId}/volunteers`)
        if (!res.ok) throw new Error("Erreur lors du chargement")
        const data = await res.json()
        setVolunteers(data.volunteers)
        setTimeslotGroups(data.timeslotGroups)
      } catch (err) {
        setError("Erreur lors du chargement des bénévoles")
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    if (sectorId) fetchData()
  }, [sectorId])

  // ✅ Filter volunteers based on search term
  const filteredVolunteers = volunteers.filter(volunteer => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    const name = `${volunteer.fields.firstname || ''} ${volunteer.fields.name || ''}`.toLowerCase()
    const email = volunteer.fields.email?.toLowerCase() || ''

    return name.includes(searchLower) || email.includes(searchLower)
  })

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle className="text-lg sm:text-xl">
              Bénévoles du secteur
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {sectorName} • {filteredVolunteers.length} bénévole{filteredVolunteers.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              🗂️ Cartes
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              📋 Tableau
            </Button>
            <Button
              onClick={fetchSectorVolunteers}
              disabled={loading}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bénévole..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">Chargement des bénévoles...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
            <Button
              onClick={fetchSectorVolunteers}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Réessayer
            </Button>
          </div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm ? "Aucun résultat" : "Aucun bénévole"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "Aucun bénévole ne correspond à votre recherche."
                : "Ce secteur n'a pas encore de bénévoles assignés."
              }
            </p>
          </div>
        ) : viewMode === "table" ? (
          <ReferentVolunteersTableView
            volunteers={filteredVolunteers}
            timeslotGroups={timeslotGroups}
            getDisplayName={(volunteer) => `${volunteer.fields.firstname} ${volunteer.fields.name}`}
            selectedTimeslot=""
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVolunteers.map((volunteer, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  {/* Volunteer Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {volunteer.fields.firstname?.charAt(0)?.toUpperCase() ||
                        volunteer.fields.name?.charAt(0)?.toUpperCase() || 'B'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">
                        {volunteer.fields.firstname} {volunteer.fields.name}
                      </h4>
                      <Badge
                        variant={volunteer.fields.status === 'actif' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {volunteer.fields.status || 'Actif'}
                      </Badge>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {volunteer.fields.email && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        <a
                          href={`mailto:${volunteer.fields.email}`}
                          className="truncate hover:text-blue-600 transition-colors"
                        >
                          {volunteer.fields.email}
                        </a>
                      </div>
                    )}

                    {volunteer.fields.phone && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 flex-shrink-0" />
                        <a
                          href={`tel:${volunteer.fields.phone}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {volunteer.fields.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {volunteer.fields.skills && volunteer.fields.skills.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {volunteer.fields.skills.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {volunteer.fields.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{volunteer.fields.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}