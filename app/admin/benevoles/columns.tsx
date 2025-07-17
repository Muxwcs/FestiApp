"use client"

import { Button } from "@/components/ui/button"
import { VolunteerRecord } from "@/types/user.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

export const createColumns = (handleDelete: (id: string) => void): ColumnDef<VolunteerRecord>[] => [
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
    cell: ({ row }) => {
      const volunteer = row.original
      // Display surname if it exists, otherwise firstname + name
      let displayName = ""
      if (volunteer.fields.surname) {
        displayName = `${volunteer.fields.surname} (${volunteer.fields.firstname || ""} ${volunteer.fields.name || ""})`.trim()
      } else if (volunteer.fields.firstname || volunteer.fields.name) {
        displayName = `${volunteer.fields.firstname || ""} ${volunteer.fields.name || ""}`.trim()
      } else {
        displayName = "Sans nom"
      }
      return <span className="font-medium">{displayName}</span>
    },
  },
  {
    accessorKey: "fields.email",
    header: "Email",
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.getValue("fields_email")}</span>
    },
  },
  {
    accessorKey: "fields.phone",
    header: "Tél",
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.getValue("fields_phone")}</span>
    },
  },
  {
    accessorKey: "fields.role",
    header: "Rôle",
  },
  {
    accessorKey: "fields.status",
    header: "Status",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const volunteer = row.original

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/benevoles/${volunteer.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(volunteer.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      )
    },
  },
]