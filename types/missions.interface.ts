export interface Mission {
  name: string
  description?: string
  dateStart: string // ISO date string
  dateEnd: string // ISO date string
  place?: string
  priority?: "Haute" | "Moyenne" | "Basse" // e.g., 'High', 'Medium', 'Low'
  status?: "À faire" | "En cours" | "Terminée" // e.g., 'Open', 'In Progress', 'Completed'
  humanRessources?: number // Array of human resources IDs
  assignedMembers?: string[] // Array of volunteer IDs
  totalAssigned?: number // Total number of assigned volunteers
  daysUntilDeadline?: number // Calculated field for days until deadline
}

export interface MissionRecord {
  id: string // Unique identifier for the mission record
  fields: Mission // Fields of the mission record
}

// ✅ FIXED: Add proper TypeScript interfaces
export interface DeadlineInfo {
  daysUntilDeadline: number
  hoursUntilDeadline: number
  isOverdue: boolean
  isDueToday: boolean
  isDueTomorrow: boolean
  isDueThisWeek: boolean
  isUrgent: boolean
}

export interface DurationInfo {
  startDate: unknown
  endDate: unknown
  durationHours: number | null
  durationDays: number | null
  isActive: boolean
  hasStarted: boolean
  hasEnded: boolean
}

export interface EnrichedMission {
  id: string
  fields: Record<string, unknown>
  createdAt: string
  enriched: {
    status: {
      current: string
      priority: string
      isCompleted: boolean
      isInProgress: boolean
      isPending: boolean
      isHigh: boolean
      isMedium: boolean
    }
    timing: {
      deadline: DeadlineInfo | null
      duration: DurationInfo | null
    }
    resources: {
      humanResources: number
      assignedMembers: number
      totalAssigned: number
      hasAttachments: boolean
    }
    location: {
      place: string
    }
    progress: {
      estimatedDuration: unknown
      isResourceComplete: boolean
    }
  }
}