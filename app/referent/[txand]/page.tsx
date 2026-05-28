"use client"

import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Save, X } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { useSectorsStore } from "@/stores/sectorsStore"
import { useVolunteers, useVolunteersStore } from "@/stores/volunteersStore"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReferentVolunteersList } from "@/components/volunteers/referent-volunteers-list"

import { SectorRecord, cleanSectorData } from "@/types/sector.interface"

// ✅ FIXED: Proper type for edit data that matches the cleaned interface
interface EditSectorData {
  id?: string
  fields?: {
    name?: string
    color?: string
    referent?: string
    status?: string
    description?: string
    skills?: string[]
    [key: string]: unknown
  }
  createdTime?: string
}

// ✅ Add this interface for manager data
interface ManagerInfo {
  id: string
  name?: string
  firstname?: string
  phone?: string
  email?: string
}

const ReferentTxandPage = () => {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const txandId = params.txand as string

  const {
    getReferentSectorById,
    // updateReferentSector,
    // fetchReferentSector,
    // deleteSector,
  } = useSectorsStore()

  // ✅ Use your composite hook for volunteers
  const { volunteers, getVolunteerById, refetch: refetchVolunteers } = useVolunteers()
  // ✅ Add state for manager data
  const [managerInfos, setManagerInfos] = useState<ManagerInfo[]>([])
  const [loadingManager, setLoadingManager] = useState(false)

  const [sector, setSector] = useState<SectorRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editData, setEditData] = useState<EditSectorData>({})

  // ✅ Updated fetchManagerInfo to handle multiple IDs
  const fetchManagerInfos = async (managerIds: string[]) => {
    if (!managerIds || managerIds.length === 0 || loadingManager) return

    console.log("🔍 Fetching manager infos for IDs:", managerIds)
    setLoadingManager(true)

    try {
      const foundManagers: ManagerInfo[] = []
      const notFoundIds: string[] = []

      // ✅ SOURCE 1: Check each manager in sector volunteers
      const sectorData = useSectorsStore.getState().getSectorVolunteers(txandId)

      for (const managerId of managerIds) {
        const manager = sectorData?.volunteers?.find(vol => vol.id === managerId)

        if (manager) {
          console.log("✅ Manager found in sector volunteers:", manager)
          foundManagers.push({
            id: manager.id,
            name: manager.fields.name,
            firstname: manager.fields.firstname,
            phone: manager.fields.phone,
            email: manager.fields.email
          })
        } else {
          notFoundIds.push(managerId)
        }
      }

      // ✅ SOURCE 2: Check remaining managers in global volunteers store
      console.log("🔍 Checking global volunteers store for:", notFoundIds)

      for (const managerId of [...notFoundIds]) {
        const globalManager = getVolunteerById(managerId)

        if (globalManager) {
          console.log("✅ Manager found in global volunteers store:", globalManager)
          foundManagers.push({
            id: globalManager.id,
            name: globalManager.fields?.name ?? undefined,
            firstname: globalManager.fields?.firstname ?? undefined,
            phone: globalManager.fields?.phone ?? undefined,
            email: globalManager.fields?.email ?? undefined
          })
          // Remove from not found list
          const index = notFoundIds.indexOf(managerId)
          if (index > -1) notFoundIds.splice(index, 1)
        }
      }

      // ✅ SOURCE 3: If we still have unfound managers and volunteers store is empty, refetch
      if (notFoundIds.length > 0 && volunteers.length === 0) {
        console.log("📡 Refetching volunteers for remaining IDs:", notFoundIds)
        await refetchVolunteers()

        for (const managerId of [...notFoundIds]) {
          const managerAfterRefetch = useVolunteersStore.getState().getVolunteerById(managerId)
          if (managerAfterRefetch) {
            console.log("✅ Manager found after refetch:", managerAfterRefetch)
            foundManagers.push({
              id: managerAfterRefetch.id,
              name: managerAfterRefetch.fields?.name ?? undefined,
              firstname: managerAfterRefetch.fields?.firstname ?? undefined,
              phone: managerAfterRefetch.fields?.phone ?? undefined,
              email: managerAfterRefetch.fields?.email ?? undefined
            })
            const index = notFoundIds.indexOf(managerId)
            if (index > -1) notFoundIds.splice(index, 1)
          }
        }
      }

      // ✅ SOURCE 4: For any remaining unfound managers, try direct API calls
      for (const managerId of notFoundIds) {
        console.log("🌐 Trying direct API call for:", managerId)
        try {
          const response = await fetch(`/api/volunteers/${managerId}`)
          if (response.ok) {
            const volunteerData = await response.json()
            console.log("✅ Manager fetched directly from API:", volunteerData)

            foundManagers.push({
              id: volunteerData.id,
              name: volunteerData.fields?.name || "Nom inconnu",
              firstname: volunteerData.fields?.firstname || "",
              phone: volunteerData.fields?.phone || "",
              email: volunteerData.fields?.email || ""
            })
          } else {
            // Add placeholder for not found manager
            foundManagers.push({
              id: managerId,
              name: "Responsable non trouvé",
              firstname: "",
              phone: "",
              email: ""
            })
          }
        } catch (apiError) {
          console.error("❌ Direct API call error for", managerId, ":", apiError)
          foundManagers.push({
            id: managerId,
            name: "Erreur de chargement",
            firstname: "",
            phone: "",
            email: ""
          })
        }
      }

      setManagerInfos(foundManagers)
      console.log("✅ Final managers found:", foundManagers)

    } catch (error) {
      console.error('❌ Error in fetchManagerInfos:', error)
      // Set error state for all managers
      setManagerInfos(managerIds.map(id => ({
        id,
        name: "Erreur de chargement",
        firstname: "",
        phone: "",
        email: ""
      })))
    } finally {
      setLoadingManager(false)
    }
  }

  // ✅ Updated useEffect to handle multiple referents
  useEffect(() => {
    if (sector?.fields?.referent && Array.isArray(sector.fields.referent) && sector.fields.referent.length > 0) {
      console.log("🎯 Sector loaded, fetching managers:", sector.fields.referent)
      fetchManagerInfos(sector.fields.referent)
    } else if (sector?.fields?.referent && typeof sector.fields.referent === 'string') {
      // Handle single referent as string
      console.log("🎯 Sector loaded, fetching single manager:", sector.fields.referent)
      fetchManagerInfos([sector.fields.referent])
    } else {
      // No referents
      setManagerInfos([])
    }
  }, [sector, volunteers.length])

  // ✅ FIXED: Initialize page with referent API
  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true)

        // ✅ First try to get from referent sectors cache
        let foundSector = getReferentSectorById(txandId)

        if (!foundSector) {
          // ✅ If not found, fetch via referent API
          try {
            console.log("🔄 Fetching sector via referent API:", txandId)
            const response = await fetch(`/api/referent/${txandId}`)

            if (!response.ok) {
              if (response.status === 404) {
                throw new Error('Sector not found')
              }
              if (response.status === 403) {
                throw new Error('You do not have access to this sector')
              }
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            foundSector = await response.json()
            console.log("✅ Sector fetched via API:", foundSector)
          } catch (error) {
            console.error("Error fetching referent sector:", error)

            if (error instanceof Error) {
              if (error.message.includes('not found')) {
                toast.error("Secteur non trouvé")
              } else if (error.message.includes('access')) {
                toast.error("Vous n'avez pas accès à ce secteur")
              } else {
                toast.error("Erreur lors du chargement")
              }
            }

            router.push("/referent")
            return
          }
        }

        if (foundSector) {
          setSector(foundSector)

          // ✅ Initialize edit data
          const cleanSector = cleanSectorData(foundSector)
          console.log("Cleaned referent sector data:", cleanSector)
          setEditData({
            id: cleanSector.id,
            fields: {
              name: cleanSector.fields.name,
              color: cleanSector.fields.color,
              referent: Array.isArray(cleanSector.fields.referent)
                ? cleanSector.fields.referent.join(", ")
                : cleanSector.fields.referent,
              status: cleanSector.fields.status,
              description: cleanSector.fields.description,
              skills: Array.isArray(cleanSector.fields.skills)
                ? cleanSector.fields.skills
                : [],
            },
            createdTime: cleanSector.createdTime
          })
        } else {
          toast.error("Secteur non trouvé")
          router.push("/referent")
          return
        }
      } catch (error) {
        console.error("Error initializing referent page:", error)
        toast.error("Erreur lors du chargement")
        router.push("/referent")
      } finally {
        setLoading(false)
      }
    }

    if (txandId && session) {
      initializePage()
    }
  }, [txandId, session, getReferentSectorById, router])


  // ✅ FIXED: Handle save with referent API
  const handleSave = async () => {
    if (!editData.fields || !sector) {
      toast.error("Données invalides")
      return
    }

    setSaving(true)
    try {
      // ✅ Prepare updates for API
      const updates: Partial<SectorRecord['fields']> = {
        name: editData.fields.name,
        color: editData.fields.color,
        status: editData.fields.status,
        description: editData.fields.description,
        skills: editData.fields.skills,
        // ✅ Handle referent field properly
        referent: typeof editData.fields.referent === 'string'
          ? editData.fields.referent.split(',').map(s => s.trim()).filter(Boolean)
          : editData.fields.referent
      }

      console.log("🔄 Updating sector via referent API:", txandId, updates)

      // ✅ Call referent API directly
      const response = await fetch(`/api/referent/${txandId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedSector = await response.json()
      console.log("✅ Sector updated via API:", updatedSector)

      // ✅ Update local state
      setSector(updatedSector)
      const cleanSector = cleanSectorData(updatedSector)
      setEditData({
        id: cleanSector.id,
        fields: {
          name: cleanSector.fields.name,
          color: cleanSector.fields.color,
          referent: Array.isArray(cleanSector.fields.referent)
            ? cleanSector.fields.referent.join(", ")
            : cleanSector.fields.referent,
          status: cleanSector.fields.status,
          description: cleanSector.fields.description,
          skills: Array.isArray(cleanSector.fields.skills)
            ? cleanSector.fields.skills
            : [],
        },
        createdTime: cleanSector.createdTime
      })

      setEditing(false)
      toast.success("Secteur mis à jour avec succès")
    } catch (error) {
      console.error("Error updating referent sector:", error)
      toast.error(error instanceof Error ? error.message : "Erreur lors de la sauvegarde")
    } finally {
      setSaving(false)
    }
  }

  // ✅ FIXED: Better cancel handler
  const handleCancel = () => {
    if (sector) {
      const cleanSector = cleanSectorData(sector)
      setEditData({
        id: cleanSector.id,
        fields: {
          name: cleanSector.fields.name,
          color: cleanSector.fields.color,
          referent: Array.isArray(cleanSector.fields.referent)
            ? cleanSector.fields.referent.join(", ")
            : cleanSector.fields.referent,
          status: cleanSector.fields.status,
          description: cleanSector.fields.description,
          skills: Array.isArray(cleanSector.fields.skills)
            ? cleanSector.fields.skills
            : [],
        },
        createdTime: cleanSector.createdTime
      })
    }
    setEditing(false)
  }

  // ✅ FIXED: Better field update handlers
  const updateField = (fieldName: string, value: unknown) => {
    setEditData(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldName]: value
      }
    }))
  }

  // ✅ FIXED: Better delete handler
  // const handleDelete = async () => {
  //   if (!sector) return

  //   if (!confirm(`Êtes-vous sûr de vouloir supprimer le secteur "${sector.fields.name || 'sans nom'}" ?`)) {
  //     return
  //   }

  //   try {
  //     await deleteSector(txandId)
  //     toast.success("Secteur supprimé avec succès")
  //     router.push("/referent")
  //   } catch (error) {
  //     console.error("Error deleting sector:", error)
  //     toast.error("Erreur lors de la suppression")
  //   }
  // }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  // Not found state
  if (!sector) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg text-center">Secteur non trouvé</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-0 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Link href="/referent">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {sector.fields.name || "Secteur sans nom"}
            </h1>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:flex-row">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full sm:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              </>
            ) : (
              <>
                {/* <Button
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button> */}
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Sector Information Card */}
          <div className="xl:col-span-1">
            <Card className="w-full h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sector.fields.color || '#6366f1' }}
                  />
                  <CardTitle className="text-lg sm:text-xl truncate">
                    {sector.fields.name || "Secteur sans nom"}
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Informations principales du secteur
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sector Name */}
                <div className="space-y-2">
                  <Label htmlFor="sectorName" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Nom du secteur
                  </Label>
                  {editing ? (
                    <Input
                      id="sectorName"
                      value={editData?.fields?.name || ""}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full"
                      placeholder="Nom du secteur"
                    />
                  ) : (
                    <p className="min-h-[20px] p-2 bg-muted rounded border">
                      {sector.fields.name || "Non renseigné"}
                    </p>
                  )}
                </div>

                {/* Sector Color */}
                <div className="space-y-2">
                  <Label htmlFor="sectorColor" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Couleur du secteur
                  </Label>
                  {editing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        id="sectorColor"
                        type="color"
                        value={editData?.fields?.color || "#6366f1"}
                        onChange={(e) => updateField('color', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={editData?.fields?.color || "#6366f1"}
                        onChange={(e) => updateField('color', e.target.value)}
                        className="flex-1"
                        placeholder="#6366f1"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: sector.fields.color || '#6366f1' }}
                      />
                      <span className="font-mono text-sm">
                        {sector.fields.color || "#6366f1"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Sector Manager - Card Design */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Responsable du secteur
                  </Label>

                  {!editing && (
                    <Card className="border border-green-100 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
                      <CardContent className="p-4">
                        {loadingManager ? (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                            </div>
                          </div>
                        ) : Array.isArray(managerInfos) && managerInfos.length > 0 ? (
                          <div className="space-y-3">
                            {managerInfos.map((manager, index) => (
                              <div key={manager.id || index} className="mb-6 last:mb-0">
                                {/* Header with Avatar and Name */}
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {manager.firstname?.charAt(0)?.toUpperCase() || manager.name?.charAt(0)?.toUpperCase() || 'R'}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-foreground">
                                      {manager.firstname} {manager.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      Responsable du secteur
                                    </p>
                                  </div>
                                </div>

                                {/* Contact Details */}
                                <div className="grid grid-cols-1 gap-2 border-t border-green-200 dark:border-green-800 pt-3">
                                  {manager.phone && (
                                    <div className="flex items-center gap-3 group">
                                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 dark:text-blue-400 text-sm">📞</span>
                                      </div>
                                      <a
                                        href={`tel:${manager.phone}`}
                                        className="text-sm text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                      >
                                        {manager.phone}
                                      </a>
                                    </div>
                                  )}
                                  {manager.email && (
                                    <div className="flex items-center gap-3 group">
                                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600 dark:text-purple-400 text-sm">✉️</span>
                                      </div>
                                      <a
                                        href={`mailto:${manager.email}`}
                                        className="text-sm text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate"
                                      >
                                        {manager.email}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-gray-500 text-2xl">👤</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Aucun responsable assigné
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sector Status */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Statut
                  </Label>
                  {editing ? (
                    <Select
                      value={editData?.fields?.status || "actif"}
                      onValueChange={(value) => updateField('status', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="actif">Actif</SelectItem>
                        <SelectItem value="inactif">Inactif</SelectItem>
                        <SelectItem value="en_pause">En pause</SelectItem>
                        <SelectItem value="archive">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="min-h-[20px]">
                      <Badge
                        variant={
                          sector.fields.status === "actif" ? "default" :
                            sector.fields.status === "inactif" ? "destructive" :
                              "secondary"
                        }
                        className="text-xs"
                      >
                        {sector.fields.status || "Actif"}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Card */}
          <div className="xl:col-span-2">
            <Card className="w-full h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">
                  Détails et gestion
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Informations complémentaires et configuration
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Description du secteur
                  </Label>
                  {editing ? (
                    <Textarea
                      id="description"
                      value={editData?.fields?.description || ""}
                      onChange={(e) => updateField('description', e.target.value)}
                      rows={4}
                      className="w-full resize-none"
                      placeholder="Décrivez le rôle et les responsabilités de ce secteur..."
                    />
                  ) : (
                    <div className="min-h-[100px] p-3 bg-muted rounded border">
                      <p className="whitespace-pre-wrap text-sm">
                        {sector.fields.description || "Aucune description disponible"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Compétences requises
                  </Label>
                  {editing ? (
                    <div className="space-y-2">
                      <Input
                        id="skills"
                        value={Array.isArray(editData?.fields?.skills) ? editData.fields.skills.join(", ") : ""}
                        onChange={(e) => updateField('skills', e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        placeholder="Ex: Communication, Organisation, Technique..."
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Séparez les compétences par des virgules
                      </p>
                    </div>
                  ) : (
                    <div className="min-h-[60px] p-3 bg-muted rounded border">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(sector.fields.skills) && sector.fields.skills.length > 0 ? (
                          sector.fields.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            >
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground italic">
                            Aucune compétence spécifiée
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted rounded-lg border">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {Array.isArray(sector.fields.txands) ? sector.fields.txands.length : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Créneaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                      {Array.isArray(sector.fields.affectations) ? sector.fields.affectations.length : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Affectations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                      {sector.fields.referent ? 1 : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Responsable</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${sector.fields.status === 'actif'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                      }`}>
                      {sector.fields.status === 'actif' ? '✓' : '✗'}
                    </div>
                    <div className="text-xs text-muted-foreground">Statut</div>
                  </div>
                </div>

                {/* Management Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Créé le</Label>
                    <p className="text-sm bg-muted p-2 rounded border">
                      {sector.createdTime ?
                        new Date(sector.createdTime).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) :
                        'Date inconnue'
                      }
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">Dernière modification</Label>
                    <p className="text-sm bg-muted p-2 rounded border">
                      {sector.fields.modifiedAt ?
                        new Date(sector.fields.modifiedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) :
                        'Jamais modifié'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Volunteers List */}
        <ReferentVolunteersList
          sectorId={txandId}
          sectorName={sector.fields.name || "Non renseigné"}
          isReferentView={true}          // ✅ ADD: Flag to indicate referent view
          useReferentAPI={true}          // ✅ ADD: Explicit flag for API choice
        />
      </div>
    </div>
  )
}

export default ReferentTxandPage