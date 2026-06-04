"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, User, Mail, Phone } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Referent {
  id: string
  user: { id: string; name: string | null; firstname: string | null; email: string; phone: string | null }
}

interface TimeslotItem {
  id: string
  name: string
  dateStart: string | null
  dateEnd: string | null
  totalVolunteers: number
  assignedCount: number
}

interface VolunteerItem {
  volunteer: {
    id: string; name: string | null; firstname: string | null; surname: string | null
    email: string; phone: string | null; status: string | null; skills: string[]; availability: string[]
  }
  timeslotNames: string[]
}

interface SectorData {
  id: string
  name: string
  description: string | null
  color: string | null
  status: string | null
  skills: string[]
  createdAt: string
  updatedAt: string
  referents: Referent[]
  timeslots: TimeslotItem[]
  totalAffectations: number
  volunteers: VolunteerItem[]
}

export function ReferentSectorDetail({ sector }: { sector: SectorData }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [filterTimeslot, setFilterTimeslot] = useState<string>("all")

  const formatDate = (iso: string | null) => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
  }

  // Filter volunteers by search + timeslot
  const filteredVolunteers = sector.volunteers.filter((v) => {
    const matchesSearch = !searchTerm || [
      v.volunteer.firstname, v.volunteer.name, v.volunteer.surname, v.volunteer.email,
    ].some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTimeslot = filterTimeslot === "all" ||
      v.timeslotNames.includes(filterTimeslot)

    return matchesSearch && matchesTimeslot
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/referent">
          <Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" /> Retour</Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color || "#6366f1" }} />
          <h1 className="text-xl sm:text-2xl font-bold">{sector.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column — Sector info */}
        <div className="space-y-6">
          {/* Sector info card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Nom</Label>
                <p className="p-2 bg-muted rounded border">{sector.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Couleur</Label>
                <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                  <div className="w-6 h-6 rounded border" style={{ backgroundColor: sector.color || "#6366f1" }} />
                  <span className="font-mono text-sm">{sector.color || "#6366f1"}</span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Statut</Label>
                <Badge variant={sector.status === "Actif" ? "default" : "secondary"}>{sector.status || "Actif"}</Badge>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Description</Label>
                <div className="min-h-15 p-3 bg-muted rounded border text-sm whitespace-pre-wrap">
                  {sector.description || "Aucune description"}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Compétences requises</Label>
                <div className="flex flex-wrap gap-1">
                  {sector.skills.length > 0
                    ? sector.skills.map((s: string, i: number) => <Badge key={i} variant="outline">{s}</Badge>)
                    : <span className="text-sm text-muted-foreground italic">Aucune</span>
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referent card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Responsable(s)</CardTitle>
            </CardHeader>
            <CardContent>
              {sector.referents.length > 0 ? (
                <div className="space-y-4">
                  {sector.referents.map((ref) => (
                    <div key={ref.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {ref.user.firstname?.charAt(0)?.toUpperCase() || ref.user.name?.charAt(0)?.toUpperCase() || "R"}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{ref.user.firstname} {ref.user.name}</h4>
                        {ref.user.phone && (
                          <a href={`tel:${ref.user.phone}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {ref.user.phone}
                          </a>
                        )}
                        {ref.user.email && (
                          <a href={`mailto:${ref.user.email}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 truncate">
                            <Mail className="h-3 w-3" /> {ref.user.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun responsable</p>
              )}
            </CardContent>
          </Card>

          {/* Quick stats */}
          <Card>
            <CardContent className="pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-blue-600">{sector.timeslots.length}</div>
                  <div className="text-xs text-muted-foreground">Créneaux</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">{sector.totalAffectations}</div>
                  <div className="text-xs text-muted-foreground">Affectations</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-purple-600">{sector.volunteers.length}</div>
                  <div className="text-xs text-muted-foreground">Bénévoles</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — Timeslots + Volunteers */}
        <div className="xl:col-span-2 space-y-6">
          {/* Timeslots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Créneaux ({sector.timeslots.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {sector.timeslots.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Aucun créneau</p>
              ) : (
                <div className="space-y-2">
                  {sector.timeslots.map((ts) => (
                    <div key={ts.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{ts.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(ts.dateStart)} → {formatDate(ts.dateEnd)}
                        </p>
                      </div>
                      <Badge variant={ts.assignedCount >= ts.totalVolunteers ? "default" : "secondary"}>
                        {ts.assignedCount}/{ts.totalVolunteers}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Volunteers list */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle className="text-lg">Bénévoles du secteur</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {filteredVolunteers.length} bénévole{filteredVolunteers.length !== 1 ? "s" : ""}
                    {searchTerm || filterTimeslot !== "all" ? " (filtré)" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant={viewMode === "cards" ? "default" : "outline"} size="sm" onClick={() => setViewMode("cards")}>
                    Cartes
                  </Button>
                  <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
                    Tableau
                  </Button>
                </div>
              </div>

              {/* Search + filter */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un bénévole..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {sector.timeslots.length > 1 && (
                  <select
                    value={filterTimeslot}
                    onChange={(e) => setFilterTimeslot(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="all">Tous les créneaux</option>
                    {sector.timeslots.map((ts) => (
                      <option key={ts.id} value={ts.name}>{ts.name}</option>
                    ))}
                  </select>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {filteredVolunteers.length === 0 ? (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {searchTerm || filterTimeslot !== "all" ? "Aucun résultat" : "Aucun bénévole"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm
                      ? "Aucun bénévole ne correspond à votre recherche."
                      : "Ce secteur n'a pas encore de bénévoles assignés."}
                  </p>
                </div>
              ) : viewMode === "table" ? (
                /* Table view */
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Nom</th>
                        <th className="text-left p-2 font-medium">Email</th>
                        <th className="text-left p-2 font-medium">Téléphone</th>
                        <th className="text-left p-2 font-medium">Créneaux</th>
                        <th className="text-left p-2 font-medium">Compétences</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVolunteers.map(({ volunteer: vol, timeslotNames }) => (
                        <tr key={vol.id} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{vol.firstname} {vol.name}</td>
                          <td className="p-2">
                            {vol.email && <a href={`mailto:${vol.email}`} className="text-muted-foreground hover:text-foreground">{vol.email}</a>}
                          </td>
                          <td className="p-2">
                            {vol.phone && <a href={`tel:${vol.phone}`} className="text-muted-foreground hover:text-foreground">{vol.phone}</a>}
                          </td>
                          <td className="p-2">
                            <div className="flex flex-wrap gap-1">
                              {timeslotNames.map((name: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{name}</Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex flex-wrap gap-1">
                              {vol.skills.slice(0, 3).map((s: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                              ))}
                              {vol.skills.length > 3 && <Badge variant="outline" className="text-xs">+{vol.skills.length - 3}</Badge>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Cards view */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredVolunteers.map(({ volunteer: vol, timeslotNames }) => (
                    <Card key={vol.id} className="border">
                      <CardContent className="p-4">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {vol.firstname?.charAt(0)?.toUpperCase() || vol.name?.charAt(0)?.toUpperCase() || "B"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{vol.firstname} {vol.name}</h4>
                            <Badge variant={vol.status === "Actif" ? "default" : "secondary"} className="text-xs">
                              {vol.status || "Actif"}
                            </Badge>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-1.5">
                          {vol.email && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3 shrink-0" />
                              <a href={`mailto:${vol.email}`} className="truncate hover:text-foreground">{vol.email}</a>
                            </div>
                          )}
                          {vol.phone && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3 shrink-0" />
                              <a href={`tel:${vol.phone}`} className="hover:text-foreground">{vol.phone}</a>
                            </div>
                          )}
                        </div>

                        {/* Timeslots */}
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {timeslotNames.map((name: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs">{name}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        {vol.skills.length > 0 && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {vol.skills.slice(0, 3).map((skill: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300">
                                  {skill}
                                </Badge>
                              ))}
                              {vol.skills.length > 3 && <Badge variant="outline" className="text-xs">+{vol.skills.length - 3}</Badge>}
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
        </div>
      </div>
    </div>
  )
}
