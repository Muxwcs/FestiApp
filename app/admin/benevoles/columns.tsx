"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export type VolunteerListItem = {
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
  skills: string[]
  createdAt: Date
  _count: { affectations: number; missionAssignments: number }
}

export const createColumns = (handleDelete: (id: string) => void): ColumnDef<VolunteerListItem>[] => [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const v = row.original
      const displayName = v.surname
        ? `${v.surname} (${v.firstname || ""} ${v.name || ""})`.trim()
        : `${v.firstname || ""} ${v.name || ""}`.trim() || "Sans nom"
      return <span className="font-medium">{displayName}</span>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "phone",
    header: "Tél",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.phone || "—"}</span>,
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const v = row.original
      return (
        <div className="flex gap-1">
          <Badge variant={v.role === "ADMIN" ? "destructive" : "secondary"}>
            {v.role === "ADMIN" ? "Admin" : "Bénévole"}
          </Badge>
          {v.isReferent && <Badge variant="outline">Référent</Badge>}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => <span>{row.original.status || "Actif"}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const v = row.original
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/benevoles/${v.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(v.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      )
    },
  },
]
