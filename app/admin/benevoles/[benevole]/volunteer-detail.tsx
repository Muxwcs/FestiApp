"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Save, X, Trash2, User, Mail, Calendar, MapPin } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VolunteerData {
  id: string
  email: string
  name: string | null
  firstname: string | null
  surname: string | null
  phone: string | null
  role: string
  isReferent: boolean
  isActive: boolean
  status: string | null
  avatar: string | null
  notes: string | null
  skills: string[]
  availability: string[]
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  affectations: {
    id: string
    status: string
    timeslot: { id: string; name: string; dateStart: string | null; dateEnd: string | null }
    sector: { id: string; name: string; color: string | null }
  }[]
  missionAssignments: {
    id: string
    mission: { id: string; name: string; dateStart: string; dateEnd: string; status: string; priority: string; place: string | null }
  }[]
  referentSectors: {
    id: string
    sector: { id: string; name: string; color: string | null }
  }[]
}

export function VolunteerDetail({ volunteer }: { volunteer: VolunteerData }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: volunteer.name || "",
    firstname: volunteer.firstname || "",
    surname: volunteer.surname || "",
    phone: volunteer.phone || "",
    email: volunteer.email,
    notes: volunteer.notes || "",
    skills: volunteer.skills,
    availability: volunteer.availability,
  })

  const initials = ((volunteer.firstname || volunteer.name || "?")[0] + (volunteer.surname || volunteer.name || "?")[0]).toUpperCase()

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/volunteers/${volunteer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })
      if (!res.ok) throw new Error()
      toast.success("Profil mis à jour")
      setEditing(false)
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Désactiver ${volunteer.firstname} ${volunteer.name} ?`)) return
    try {
      await fetch(`/api/volunteers/${volunteer.id}`, { method: "DELETE" })
      toast.success("Bénévole désactivé")
      router.push("/admin/benevoles")
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const formatDate = (iso: string | null) => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/admin/benevoles">
            <Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" /> Retour</Button>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{volunteer.firstname} {volunteer.name}</h1>
              <p className="text-sm text-muted-foreground">{volunteer.email}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button onClick={handleSave} disabled={isPending}><Save className="h-4 w-4 mr-2" /> Sauvegarder</Button>
              <Button variant="outline" onClick={() => setEditing(false)}><X className="h-4 w-4 mr-2" /> Annuler</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditing(true)}><Edit className="h-4 w-4 mr-2" /> Modifier</Button>
              <Button variant="destructive" onClick={handleDelete}><Trash2 className="h-4 w-4 mr-2" /> Désactiver</Button>
            </>
          )}
        </div>
      </div>

      {/* Role badges */}
      <div className="flex gap-2">
        <Badge variant={volunteer.role === "ADMIN" ? "destructive" : "secondary"}>
          {volunteer.role === "ADMIN" ? "Admin" : "Bénévole"}
        </Badge>
        {volunteer.isReferent && <Badge variant="outline">Référent</Badge>}
        {!volunteer.isActive && <Badge variant="destructive">Inactif</Badge>}
        {volunteer.referentSectors.map((rs) => (
          <Badge key={rs.id} variant="outline" style={{ borderColor: rs.sector.color || undefined }}>
            Réf. {rs.sector.name}
          </Badge>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-1 hidden sm:inline" /> Profil</TabsTrigger>
          <TabsTrigger value="assignments"><Calendar className="h-4 w-4 mr-1 hidden sm:inline" /> Créneaux ({volunteer.affectations.length})</TabsTrigger>
          <TabsTrigger value="missions"><MapPin className="h-4 w-4 mr-1 hidden sm:inline" /> Missions ({volunteer.missionAssignments.length})</TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><User className="h-4 w-4" /> Identité</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {(["firstname", "name", "surname"] as const).map((field) => (
                  <div key={field} className="space-y-1">
                    <Label className="text-sm capitalize">{field === "firstname" ? "Prénom" : field === "name" ? "Nom" : "Surnom"}</Label>
                    {editing ? (
                      <Input value={editData[field]} onChange={(e) => setEditData((p) => ({ ...p, [field]: e.target.value }))} />
                    ) : (
                      <p className="p-2 bg-muted rounded border">{volunteer[field] || "—"}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Mail className="h-4 w-4" /> Contact</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-sm">Email</Label>
                  {editing ? (
                    <Input type="email" value={editData.email} onChange={(e) => setEditData((p) => ({ ...p, email: e.target.value }))} />
                  ) : (
                    <p className="p-2 bg-muted rounded border">{volunteer.email}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Téléphone</Label>
                  {editing ? (
                    <Input value={editData.phone} onChange={(e) => setEditData((p) => ({ ...p, phone: e.target.value }))} />
                  ) : (
                    <p className="p-2 bg-muted rounded border">{volunteer.phone || "—"}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Compétences</Label>
                  {editing ? (
                    <Input
                      value={editData.skills.join(", ")}
                      onChange={(e) => setEditData((p) => ({ ...p, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                      placeholder="bar, accueil, technique..."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1 min-h-9 p-2 bg-muted rounded border">
                      {volunteer.skills.length > 0 ? volunteer.skills.map((s, i) => <Badge key={i} variant="outline">{s}</Badge>) : <span className="text-muted-foreground text-sm">—</span>}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Notes</Label>
                  {editing ? (
                    <Textarea value={editData.notes} onChange={(e) => setEditData((p) => ({ ...p, notes: e.target.value }))} rows={3} />
                  ) : (
                    <p className="p-2 bg-muted rounded border text-sm min-h-15 whitespace-pre-wrap">{volunteer.notes || "—"}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account info */}
          <Card className="mt-6">
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div><Label className="text-xs text-muted-foreground">Créé le</Label><p>{new Date(volunteer.createdAt).toLocaleDateString("fr-FR")}</p></div>
                <div><Label className="text-xs text-muted-foreground">Modifié le</Label><p>{new Date(volunteer.updatedAt).toLocaleDateString("fr-FR")}</p></div>
                <div><Label className="text-xs text-muted-foreground">Dernière connexion</Label><p>{volunteer.lastLoginAt ? new Date(volunteer.lastLoginAt).toLocaleDateString("fr-FR") : "Jamais"}</p></div>
                <div><Label className="text-xs text-muted-foreground">Disponibilités</Label><p>{volunteer.availability.join(", ") || "—"}</p></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ASSIGNMENTS TAB */}
        <TabsContent value="assignments">
          <Card>
            <CardHeader><CardTitle className="text-lg">Affectations aux créneaux</CardTitle></CardHeader>
            <CardContent>
              {volunteer.affectations.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">Aucune affectation</p>
              ) : (
                <div className="space-y-2">
                  {volunteer.affectations.map((aff) => (
                    <div key={aff.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: aff.sector.color || "#10b981" }} />
                        <div>
                          <p className="font-medium text-sm">{aff.timeslot.name}</p>
                          <p className="text-xs text-muted-foreground">{aff.sector.name} • {formatDate(aff.timeslot.dateStart)}</p>
                        </div>
                      </div>
                      <Badge variant={aff.status === "VALIDE" ? "default" : aff.status === "REFUSE" ? "destructive" : "secondary"}>
                        {aff.status === "VALIDE" ? "Validé" : aff.status === "REFUSE" ? "Refusé" : "En attente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* MISSIONS TAB */}
        <TabsContent value="missions">
          <Card>
            <CardHeader><CardTitle className="text-lg">Missions assignées</CardTitle></CardHeader>
            <CardContent>
              {volunteer.missionAssignments.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">Aucune mission</p>
              ) : (
                <div className="space-y-2">
                  {volunteer.missionAssignments.map((ma) => (
                    <div key={ma.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{ma.mission.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {ma.mission.place && `${ma.mission.place} • `}
                          {formatDate(ma.mission.dateStart)} → {formatDate(ma.mission.dateEnd)}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant={ma.mission.priority === "HAUTE" ? "destructive" : "secondary"}>
                          {ma.mission.priority === "HAUTE" ? "Haute" : ma.mission.priority === "MOYENNE" ? "Moyenne" : "Basse"}
                        </Badge>
                        <Badge variant={ma.mission.status === "TERMINEE" ? "default" : "outline"}>
                          {ma.mission.status === "A_FAIRE" ? "À faire" : ma.mission.status === "EN_COURS" ? "En cours" : "Terminée"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
