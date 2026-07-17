"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command"

export interface ComboboxUser {
  id: string
  name: string | null
  firstname: string | null
  surname: string | null
  email: string
  phone?: string | null
}

interface UserComboboxProps {
  users: ComboboxUser[]
  excludeIds: string[]
  onSelect: (userId: string) => void
  label?: string
}

const displayName = (u: ComboboxUser) => {
  if (u.surname) return `${u.surname} (${[u.firstname, u.name].filter(Boolean).join(" ")})`
  return [u.firstname, u.name].filter(Boolean).join(" ") || u.email
}

export function UserCombobox({ users, excludeIds, onSelect, label }: UserComboboxProps) {
  const [open, setOpen] = useState(false)
  const filtered = users.filter((u) => !excludeIds.includes(u.id))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-3 w-3" />
          {label || "Ajouter un utilisateur"}
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