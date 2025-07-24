"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { SectorRecord } from "@/types/sector.interface"

export const createColumns = (handleDelete: (id: string) => void): ColumnDef<SectorRecord>[] => [
  {
    accessorKey: "fields.name",
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fields.totalNeeds",
    header: "Ninjas manquant(s)",
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.getValue("fields_totalNeeds")}</span>
    },
  },
  {
    accessorKey: "fields.totalVolunteers",
    header: "Besoin(s) en ninjas",
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.getValue("fields_totalVolunteers")}</span>
    },
  },
  {
    accessorKey: "fields.skills",
    header: "Compétences",
    cell: ({ row }) => {
      const skills = row.getValue("fields_skills") as string[]
      return skills.map((skill, index) => (
        <Badge key={index} className="mr-1 mb-1">
          {skill}
        </Badge>
      ))

    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const sector = row.original

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/txands/${sector.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(sector.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      )
    },
  },
]