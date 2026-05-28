"use client"

import { useCalendarStore } from "@/stores/calendarStore"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ChangeBadgeVariantInput() {
  const { badgeVariant, setBadgeVariant } = useCalendarStore()

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Change badge variant</p>

      <Select value={badgeVariant} onValueChange={setBadgeVariant}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="dot">Dot</SelectItem>
          <SelectItem value="colored">Colored</SelectItem>
          <SelectItem value="mixed">Mixed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}