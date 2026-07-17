"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, Search, ListTodo, X, Crown } from "lucide-react"
import { toast } from "sonner"
import { UserCombobox, type ComboboxUser } from "@/components/admin/user-combobox"

// ─── Types ──────────────────────────────────────────────

interface MissionItem {
  id: string
  name: string
  description: string | null
  dateStart: string
  dateEnd: string
  place: string | null
  priority: "HAUTE" | "MOYENNE" | "BASSE"
  status: "A_FAIRE" | "EN_COURS" | "TERMINEE"
  humanResources: number
  assignedUsers: ComboboxUser[]
  responsible: ComboboxUser | null
}

interface Props {
  missions: MissionItem[]
  users: ComboboxUser[]
}

// ─── Helpers ────────────────────────────────────────────

const priorityConfig = {
  HAUTE: { label: "Haute", variant: "destructive" as const },
  MOYENNE: { label: "Moyenne", variant: "default" as const },
  BASSE: { label: "Basse", variant: "secondary" as const },
}

const statusConfig = {
  A_FAIRE: { label: "À faire", className: "bg-slate-100 text-slate-800" },
  EN_COURS: { label: "En cours", className: "bg-blue-100 text-blue-800" },
  TERMINEE: { label: "Terminée", className: "bg-green-100 text-green-800" },
}

const displayName = (u: ComboboxUser) => {
  if (u.surname) return `${u.surname} (${[u.firstname, u.name].filter(Boolean).join(" ")})`
  return [u.firstname, u.name].filter(Boolean).join(" ") || u.email
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })

const toDatetimeLocal = (iso: string) => {
  const d = new Date(iso)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

const defaultForm = {
  name: "",
  description: "",
  dateStart: "",
  dateEnd: "",
  place: "",
  priority: "MOYENNE",
  status: "A_FAIRE",
  humanResources: 0,
  responsibleId: null as string | null,
}

// ─── Component ──────────────────────────────────────────

export function MissionsClient({ missions, users }: Props) {
  const router = useRouter()
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<MissionItem | null>(null)
  const [editingMission, setEditingMission] = useState<MissionItem | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState(defaultForm)

  const openCreate = () => {
    setEditingMission(null)
    setSelectedUserIds([])
    setForm({ ...defaultForm })
    setDialogOpen(true)
  }

  const openEdit = (mission: MissionItem) => {
    setEditingMission(mission)
    setSelectedUserIds(mission.assignedUsers.map((u) => u.id))
    setForm({
      name: mission.name,
      description: mission.description ?? "",
      dateStart: toDatetimeLocal(mission.dateStart),
      dateEnd: toDatetimeLocal(mission.dateEnd),
      place: mission.place ?? "",
      priority: mission.priority,
      status: mission.status,
      humanResources: mission.humanResources,
      responsibleId: mission.responsible?.id ?? null,
    })
    setDialogOpen(true)
  }

  const toggleUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  const handleSubmit = async () => {
    if (!form.name || !form.dateStart || !form.dateEnd) {
      toast.error("Nom, date de début et de fin requis")
      return
    }

    setIsLoading(true)
    try {
      const payload = { ...form, assignedUserIds: selectedUserIds }

      const res = editingMission
        ? await fetch(`/api/admin/missions/${editingMission.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        : await fetch("/api/admin/missions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Erreur serveur")
      }

      toast.success(editingMission ? "Mission mise à jour" : "Mission créée")
      setDialogOpen(false)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'enregistrement")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/missions/${deleteTarget.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()

      toast.success("Mission supprimée")
      setDeleteTarget(null)
      router.refresh()
    } catch {
      toast.error("Erreur lors de la suppression")
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Columns ──────────────────────────────────────────

  const responsibleUser = form.responsibleId
    ? users.find((u) => u.id === form.responsibleId) ?? null
    : null

  const columns: ColumnDef<MissionItem>[] = [
    {
      accessorKey: "name",
      header: "Mission",
      cell: ({ row }) => (
        <div>
          <span className="font-medium">{row.original.name}</span>
          {row.original.place && (
            <span className="text-xs text-muted-foreground ml-2">📍 {row.original.place}</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "dateStart",
      header: "Période",
      cell: ({ row }) => (
        <span className="text-sm">
          {formatDate(row.original.dateStart)} → {formatDate(row.original.dateEnd)}
        </span>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priorité",
      cell: ({ row }) => {
        const p = priorityConfig[row.original.priority]
        return <Badge variant={p.variant}>{p.label}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const s = statusConfig[row.original.status]
        return <Badge className={s.className}>{s.label}</Badge>
      },
    },
    {
      id: "responsible",
      header: "Responsable",
      cell: ({ row }) => {
        const r = row.original.responsible
        if (!r) return <span className="text-muted-foreground text-sm">—</span>
        return (
          <div className="text-sm">
            <span className="flex items-center gap-1">
              <Crown className="h-3 w-3 text-amber-500" />
              {displayName(r)}
            </span>
            {r.phone && (
              <span className="text-xs text-muted-foreground">📞 {r.phone}</span>
            )}
          </div>
        )
      },
    },
    {
      id: "assigned",
      header: "Assignés",
      cell: ({ row }) => {
        const assigned = row.original.assignedUsers
        if (assigned.length === 0)
          return <span className="text-muted-foreground text-sm">—</span>
        return (
          <div className="flex flex-wrap gap-1">
            {assigned.map((u) => (
              <Badge key={u.id} variant="outline" className="text-xs" title={u.phone || undefined}>
                {displayName(u)}
                {u.phone && <span className="text-muted-foreground ml-1">📞</span>}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <Button variant="ghost" size="icon" onClick={() => openEdit(row.original)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row.original)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: missions,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // ─── Render ───────────────────────────────────────────

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Missions
            </CardTitle>
            <Button onClick={openCreate} size="sm">
              <Plus className="h-4 w-4 mr-1" /> Nouvelle mission
            </Button>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher…"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                    Aucune mission
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ─── Create / Edit Dialog ─── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMission ? "Modifier la mission" : "Nouvelle mission"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="dateStart">Début *</Label>
                <Input
                  id="dateStart"
                  type="datetime-local"
                  value={form.dateStart}
                  onChange={(e) => setForm((f) => ({ ...f, dateStart: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateEnd">Fin *</Label>
                <Input
                  id="dateEnd"
                  type="datetime-local"
                  value={form.dateEnd}
                  onChange={(e) => setForm((f) => ({ ...f, dateEnd: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="place">Lieu</Label>
              <Input
                id="place"
                value={form.place}
                onChange={(e) => setForm((f) => ({ ...f, place: e.target.value }))}
                placeholder="ex: Bayonne, salle des fêtes…"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select
                  value={form.priority}
                  onValueChange={(v) => setForm((f) => ({ ...f, priority: v }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HAUTE">Haute</SelectItem>
                    <SelectItem value="MOYENNE">Moyenne</SelectItem>
                    <SelectItem value="BASSE">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A_FAIRE">À faire</SelectItem>
                    <SelectItem value="EN_COURS">En cours</SelectItem>
                    <SelectItem value="TERMINEE">Terminée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="humanResources">Effectif</Label>
                <Input
                  id="humanResources"
                  type="number"
                  min={0}
                  value={form.humanResources}
                  onChange={(e) => setForm((f) => ({ ...f, humanResources: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            {/* ─── Responsable ─── */}
            <div className="space-y-2">
              <Label>Responsable</Label>
              {responsibleUser ? (
                <div className="flex items-center gap-2 p-2 rounded border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <Crown className="h-4 w-4 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium flex-1">{displayName(responsibleUser)}</span>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, responsibleId: null }))}
                    className="rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div>
                  <UserCombobox
                    users={users}
                    excludeIds={[]}
                    onSelect={(id) => setForm((f) => ({ ...f, responsibleId: id }))}
                    label="Désigner un responsable"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Si non défini, vous serez assigné automatiquement
                  </p>
                </div>
              )}
            </div>

            {/* ─── Assignés ─── */}
            <div className="space-y-2">
              <Label>Assigner des utilisateurs</Label>
              {selectedUserIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedUserIds.map((id) => {
                    const u = users.find((u) => u.id === id)
                    if (!u) return null
                    return (
                      <Badge key={id} variant="secondary" className="gap-1 pr-1">
                        {displayName(u)}
                        <button
                          type="button"
                          onClick={() => toggleUser(id)}
                          className="ml-1 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )}
              <UserCombobox
                users={users}
                excludeIds={selectedUserIds}
                onSelect={toggleUser}
                label="Assigner un utilisateur"
              />
              {selectedUserIds.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedUserIds.length} sélectionné{selectedUserIds.length > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "…" : editingMission ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Delete Confirmation ─── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer « {deleteTarget?.name} » ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Les affectations associées seront également supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}