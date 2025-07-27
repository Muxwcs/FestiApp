export interface User {
  id?: string
  firebaseUid?: string // Firebase UID for user authentication
  email?: string | null
  phone?: string | null
  name?: string | null
  firstname?: string | null // Added for clarity
  surname?: string | null
  dispos?: string[]
  role?: "admin" | "bénévole" // Use specific roles
  availability?: string[] // Array of availability strings
  assignedTasks?: string[] // Array of task IDs
  assignedTxands?: string[] // Array of affectations IDs
  "Upcoming Task Deadline"?: string // ISO date string for upcoming task deadline
  "Total Tasks Assigned"?: number // Total number of tasks assigned
  totalTaskAssigned?: number // Total number of tasks assigned
  upcomingTaskDeadline?: string // ISO date string for upcoming task deadline
  status?: string // Status of the user
  skills?: string[] // Array of skills
  avatar?: string // URL to the user's avatar
  notes?: string // Additional notes about the user
  referent?: string[] // Array of referent ids
  createdAt?: string // ISO date string
  modifiedAt?: string // ISO date string
  modifiedBy?: string // email of the user who last modified this record
}

export interface VolunteerRecord {
  id: string
  fields: User // Cast to User type
}