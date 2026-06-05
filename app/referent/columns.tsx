"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type ReferentSectorItem = {
  id: string
  name: string
  description: string | null
  color: string | null
  status: string | null
  skills: string[]
  _count: { timeslots: number; affectations: number }
}

export const createColumns = (): ColumnDef<ReferentSectorItem>[] => [
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
      const s = row.original
      return (
        <div className="flex items-center gap-2">
          {s.color && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />}
          <span className="font-medium">{s.name}</span>
        </div>
      )
    },
  },
  {
    id: "timeslots",
    header: "Créneaux",
    cell: ({ row }) => <span>{row.original._count.timeslots}</span>,
  },
  {
    id: "affectations",
    header: "Bénévoles affectés",
    cell: ({ row }) => <span>{row.original._count.affectations}</span>,
  },
  {
    accessorKey: "skills",
    header: "Compétences",
    cell: ({ row }) => {
      const skills = row.original.skills
      if (!skills?.length) return <span className="text-muted-foreground">—</span>
      return (
        <div className="flex flex-wrap gap-1">
          {skills.map((skill: string, i: number) => (
            <Badge key={i} variant="secondary">{skill}</Badge>
          ))}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <Link href={`/referent/${row.original.id}`}>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" /> Voir
        </Button>
      </Link>
    ),
  },
]
