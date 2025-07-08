export interface User {
  id?: string
  email?: string | null
  phone?: string | null
  name?: string | null
  surname?: string | null
  role?: "admin" | "bénévole" // Use specific roles
  availability?: string[] // Array of availability strings
  assignedTasks?: string[] // Array of task IDs
  status?: string // Status of the user
  skills?: string[] // Array of skills
  avatar?: string // URL to the user's avatar
  notes?: string // Additional notes about the user
  createdAt?: string // ISO date string
  modifiedAt?: string // ISO date string
}

export interface VolunteerRecord {
  id: string
  fields: User // Cast to User type
}