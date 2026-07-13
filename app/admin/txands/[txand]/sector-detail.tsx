"use client"

import { useState, useTransition, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Save, X, Trash2, Plus, Search, UserMinus } from "lucide-react"
import { toast } from "sonner"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command"

import { CreateTimeslotDialog } from "@/components/admin/sectors/create-timeslot-dialog"

// ─── Types ──────────────────────────────────────────────

interface SimpleUser {
  id: string
  name: string | null
  firstname: string | null
  surname: string | null
  email: string
}

interface Referent {
  id: string
  user: SimpleUser & { phone: string | null }
}

interface TimeslotAffectation {
  id: string
  status: string
  volunteer: SimpleUser & { phone: string | null }
}

interface Timeslot {
  id: string
  name: string
  dateStart: string | null
  dateEnd: string | null
  totalVolunteers: number
  details: string | null
  _count: { affectations: number }
  referents: Referent[]
  affectations: TimeslotAffectation[]
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
  timeslots: Timeslot[]
  _count: { affectations: number }
}

interface SectorDetailProps {
  sector: SectorData
  allUsers: SimpleUser[]
}

// ─── User Search Combobox ───────────────────────────────

function UserCombobox({
  users,
  excludeIds,
  onSelect,
  label,
}: {
  users: SimpleUser[]
  excludeIds: string[]
  onSelect: (userId: string) => void
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const filtered = users.filter((u) => !excludeIds.includes(u.id))

  const displayName = (u: SimpleUser) => {
    if (u.surname) return `${u.surname} (${[u.firstname, u.name].filter(Boolean).join(" ")})`
    return [u.firstname, u.name].filter(Boolean).join(" ") || u.email
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-3 w-3" />
          {label || "Ajouter un référent"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Aucun utilisateur trouvé</CommandEmpty>
            <CommandGroup>
              {filtered.map((u) => (
                <CommandItem
                  key={u.id}
                  value={`${u.firstname} ${u.name} ${u.surname} ${u.email}`}
                  onSelect={() => {
                    onSelect(u.id)
                    setOpen(false)
                  }}
                >
                  <div>
                    <p className="text-sm font-medium">{displayName(u)}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// ─── Main Component ─────────────────────────────────────

export function SectorDetail({ sector, allUsers }: SectorDetailProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState(false)
  const [timeslotOpen, setTimeslotOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: sector.name,
    color: sector.color || "#6366f1",
    status: sector.status || "Actif",
    description: sector.description || "",
    skills: sector.skills,
  })
  const [editingTimeslotId, setEditingTimeslotId] = useState<string | null>(null)
  const [tsEditData, setTsEditData] = useState<{
    name: string; dateStart: string; dateEnd: string; totalVolunteers: number; details: string
  }>({ name: "", dateStart: "", dateEnd: "", totalVolunteers: 0, details: "" })

  const updateField = (key: string, value: unknown) => {
    setEditData((prev) => ({ ...prev, [key]: value }))
  }

  const refresh = useCallback(() => {
    startTransition(() => router.refresh())
  }, [router])

  // ─── Timeslot Edit ────────────────────────────

  const toLocalDatetime = (iso: string | null) => {
    if (!iso) return ""
    const d = new Date(iso)
    const offset = d.getTimezoneOffset()
    const local = new Date(d.getTime() - offset * 60000)
    return local.toISOString().slice(0, 16)
  }

  const startEditTimeslot = (ts: Timeslot) => {
    setEditingTimeslotId(ts.id)
    setTsEditData({
      name: ts.name,
      dateStart: toLocalDatetime(ts.dateStart),
      dateEnd: toLocalDatetime(ts.dateEnd),
      totalVolunteers: ts.totalVolunteers,
      details: ts.details || "",
    })
  }

  const saveTimeslot = async (timeslotId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/timeslots/${timeslotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tsEditData,
          dateStart: tsEditData.dateStart || null,
          dateEnd: tsEditData.dateEnd || null,
        }),
      })
      if (!res.ok) throw new Error()
      toast.success("Créneau mis à jour")
      setEditingTimeslotId(null)
      refresh()
    } catch {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const deleteTimeslot = async (timeslotId: string, name: string) => {
    if (!confirm(`Supprimer le créneau "${name}" ?`)) return
    try {
      await fetch(`/api/txands/${sector.id}/timeslots/${timeslotId}`, { method: "DELETE" })
      toast.success("Créneau supprimé")
      refresh()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  // ─── Affectation Management ───────────────────

  const addAffectation = async (timeslotId: string, volunteerId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/timeslots/${timeslotId}/affectations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteerId }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Erreur")
      }
      toast.success("Bénévole affecté")
      refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'affectation")
    }
  }

  const removeAffectation = async (timeslotId: string, volunteerId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/timeslots/${timeslotId}/affectations`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteerId }),
      })
      if (!res.ok) throw new Error()
      toast.success("Affectation retirée")
      refresh()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  // ─── Sector CRUD ────────────────────────────

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/txands/${sector.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })
      if (!res.ok) throw new Error()
      toast.success("Secteur mis à jour")
      setEditing(false)
      refresh()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  const handleCancel = () => {
    setEditData({
      name: sector.name,
      color: sector.color || "#6366f1",
      status: sector.status || "Actif",
      description: sector.description || "",
      skills: sector.skills,
    })
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm(`Supprimer le secteur "${sector.name}" ?`)) return
    try {
      await fetch(`/api/txands/${sector.id}`, { method: "DELETE" })
      toast.success("Secteur supprimé")
      router.push("/admin/txands")
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  // ─── Sector Referent Management ─────────────

  const addSectorReferent = async (userId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/referents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      if (!res.ok) throw new Error()
      toast.success("Référent ajouté au secteur")
      refresh()
    } catch {
      toast.error("Erreur lors de l'ajout")
    }
  }

  const removeSectorReferent = async (userId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/referents`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      if (!res.ok) throw new Error()
      toast.success("Référent retiré du secteur")
      refresh()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  // ─── Timeslot Referent Management ───────────

  const addTimeslotReferent = async (timeslotId: string, userId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/timeslots/${timeslotId}/referents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      if (!res.ok) throw new Error()
      toast.success("Référent ajouté au créneau")
      refresh()
    } catch {
      toast.error("Erreur lors de l'ajout")
    }
  }

  const removeTimeslotReferent = async (timeslotId: string, userId: string) => {
    try {
      const res = await fetch(`/api/txands/${sector.id}/timeslots/${timeslotId}/referents`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      if (!res.ok) throw new Error()
      toast.success("Référent retiré du créneau")
      refresh()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  // ─── Helpers ────────────────────────────────

  const formatDate = (iso: string | null) => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    })
  }

  const displayName = (u: { firstname: string | null; name: string | null; email: string }) =>
    [u.firstname, u.name].filter(Boolean).join(" ") || u.email

  // ─── Render ─────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/admin/txands">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color || "#6366f1" }} />
            <h1 className="text-xl sm:text-2xl font-bold">{sector.name}</h1>
          </div>
        </div>

        <div className="flex space-x-2">
          {editing ? (
            <>
              <Button onClick={handleSave} disabled={isPending}>
                <Save className="h-4 w-4 mr-2" /> {isPending ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Annuler
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" /> Modifier
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" /> Supprimer
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="infos" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="infos">Infos générales</TabsTrigger>
          <TabsTrigger value="creneaux">
            Créneaux ({sector.timeslots.length})
          </TabsTrigger>
        </TabsList>

        {/* ═══ TAB: Infos générales ═══ */}
        <TabsContent value="infos">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Sector Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Nom</Label>
                  {editing ? (
                    <Input value={editData.name} onChange={(e) => updateField("name", e.target.value)} />
                  ) : (
                    <p className="p-2 bg-muted rounded border">{sector.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">Couleur</Label>
                  {editing ? (
                    <div className="flex items-center gap-2">
                      <Input type="color" value={editData.color} onChange={(e) => updateField("color", e.target.value)} className="w-16 h-10 p-1" />
                      <Input value={editData.color} onChange={(e) => updateField("color", e.target.value)} className="flex-1 font-mono" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: sector.color || "#6366f1" }} />
                      <span className="font-mono text-sm">{sector.color || "#6366f1"}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">Statut</Label>
                  {editing ? (
                    <Select value={editData.status} onValueChange={(v) => updateField("status", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Actif">Actif</SelectItem>
                        <SelectItem value="Inactif">Inactif</SelectItem>
                        <SelectItem value="En pause">En pause</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={sector.status === "Actif" ? "default" : "secondary"}>
                      {sector.status || "Actif"}
                    </Badge>
                  )}
                </div>

                {/* Sector Referents */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Responsable(s) du secteur</Label>
                  {sector.referents.map((ref) => (
                    <div key={ref.id} className="flex items-center justify-between p-2 rounded border bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                      <div>
                        <p className="text-sm font-medium">{displayName(ref.user)}</p>
                        {ref.user.phone && (
                          <p className="text-xs text-muted-foreground">📞 {ref.user.phone}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeSectorReferent(ref.user.id)}
                      >
                        <UserMinus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  <UserCombobox
                    users={allUsers}
                    excludeIds={sector.referents.map((r) => r.user.id)}
                    onSelect={addSectorReferent}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <div className="xl:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Détails</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Description</Label>
                    {editing ? (
                      <Textarea value={editData.description} onChange={(e) => updateField("description", e.target.value)} rows={4} />
                    ) : (
                      <div className="min-h-20 p-3 bg-muted rounded border text-sm whitespace-pre-wrap">
                        {sector.description || "Aucune description"}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Compétences requises</Label>
                    {editing ? (
                      <div>
                        <Input
                          value={editData.skills.join(", ")}
                          onChange={(e) => updateField("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                          placeholder="Ex: Bar, Accueil, Technique..."
                        />
                        <p className="text-xs text-muted-foreground mt-1">Séparez par des virgules</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {sector.skills.length > 0
                          ? sector.skills.map((s, i) => <Badge key={i} variant="outline">{s}</Badge>)
                          : <span className="text-sm text-muted-foreground italic">Aucune compétence</span>
                        }
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg border">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{sector.timeslots.length}</div>
                      <div className="text-xs text-muted-foreground">Créneaux</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{sector._count.affectations}</div>
                      <div className="text-xs text-muted-foreground">Affectations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">{sector.referents.length}</div>
                      <div className="text-xs text-muted-foreground">Responsable(s)</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">Créé le</Label>
                      <p className="p-2 bg-muted rounded border">
                        {new Date(sector.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Modifié le</Label>
                      <p className="p-2 bg-muted rounded border">
                        {new Date(sector.updatedAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ═══ TAB: Créneaux ═══ */}
        <TabsContent value="creneaux">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Créneaux</CardTitle>
                <Button size="sm" onClick={() => setTimeslotOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Ajouter un créneau
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {sector.timeslots.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <p className="text-muted-foreground">Aucun créneau pour ce secteur</p>
                  <Button variant="outline" className="mt-4" onClick={() => setTimeslotOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Créer le premier créneau
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sector.timeslots.map((ts) => {
                    const isEditing = editingTimeslotId === ts.id

                    return (
                      <Card key={ts.id} className="border">
                        <CardContent className="p-4 space-y-3">
                          {/* Header */}
                          {isEditing ? (
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Nom</Label>
                                <Input
                                  value={tsEditData.name}
                                  onChange={(e) => setTsEditData((p) => ({ ...p, name: e.target.value }))}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label className="text-xs">Début</Label>
                                  <Input
                                    type="datetime-local"
                                    value={tsEditData.dateStart}
                                    onChange={(e) => setTsEditData((p) => ({ ...p, dateStart: e.target.value }))}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">Fin</Label>
                                  <Input
                                    type="datetime-local"
                                    value={tsEditData.dateEnd}
                                    onChange={(e) => setTsEditData((p) => ({ ...p, dateEnd: e.target.value }))}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label className="text-xs">Bénévoles nécessaires</Label>
                                  <Input
                                    type="number"
                                    min={0}
                                    value={tsEditData.totalVolunteers}
                                    onChange={(e) => setTsEditData((p) => ({ ...p, totalVolunteers: parseInt(e.target.value) || 0 }))}
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Détails</Label>
                                <Textarea
                                  value={tsEditData.details}
                                  onChange={(e) => setTsEditData((p) => ({ ...p, details: e.target.value }))}
                                  rows={2}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveTimeslot(ts.id)}>
                                  <Save className="h-3 w-3 mr-1" /> Sauvegarder
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingTimeslotId(null)}>
                                  Annuler
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold">{ts.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(ts.dateStart)} → {formatDate(ts.dateEnd)}
                                </p>
                                {ts.details && <p className="text-sm text-muted-foreground mt-1">{ts.details}</p>}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={ts.affectations.length >= ts.totalVolunteers ? "default" : "secondary"}>
                                  {ts.affectations.length}/{ts.totalVolunteers}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEditTimeslot(ts)}>
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteTimeslot(ts.id, ts.name)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Referents */}
                          {!isEditing && (
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-muted-foreground">Référents</Label>
                              <div className="flex flex-wrap gap-2">
                                {ts.referents.map((ref) => (
                                  <Badge key={ref.id} variant="outline" className="gap-1 pr-1">
                                    {displayName(ref.user)}
                                    {ref.user.phone && (
                                      <span className="text-xs text-muted-foreground">📞 {ref.user.phone}</span>
                                    )}
                                    <button
                                      onClick={() => removeTimeslotReferent(ts.id, ref.user.id)}
                                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                              <UserCombobox
                                users={allUsers}
                                excludeIds={ts.referents.map((r) => r.user.id)}
                                onSelect={(userId) => addTimeslotReferent(ts.id, userId)}
                                label="Ajouter référent"
                              />
                            </div>
                          )}

                          {/* Volunteers (Affectations) */}
                          {!isEditing && (
                            <div className="space-y-2 pt-2 border-t">
                              <Label className="text-xs font-medium text-muted-foreground">
                                Bénévoles ({ts.affectations.length}/{ts.totalVolunteers})
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {ts.affectations.map((aff) => (
                                  <Badge key={aff.id} variant="secondary" className="gap-1 pr-1">
                                    {displayName(aff.volunteer)}
                                    {aff.volunteer.phone && (
                                      <span className="text-xs text-muted-foreground">📞 {aff.volunteer.phone}</span>
                                    )}
                                    <button
                                      onClick={() => removeAffectation(ts.id, aff.volunteer.id)}
                                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                              <UserCombobox
                                users={allUsers}
                                excludeIds={ts.affectations.map((a) => a.volunteer.id)}
                                onSelect={(userId) => addAffectation(ts.id, userId)}
                                label="Ajouter bénévole"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateTimeslotDialog
        open={timeslotOpen}
        onOpenChange={setTimeslotOpen}
        sectorId={sector.id}
        sectorName={sector.name}
      />
    </div>
  )
}