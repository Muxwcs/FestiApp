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