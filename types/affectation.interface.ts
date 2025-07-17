export interface Affectations {
  number: number // Unique identifier for the affectation
  volunteer?: string[] // Array of volunteer IDs - Link to Membres table
  txand?: string[] // Array of timeslot IDs - Link to Creneaux table
  pole?: string[] // Array of sector IDs - Link to Pole table
  status?: "Validé" | "En attente" | "Refusé" // Status of the affectation
  createdAt?: string // ISO date string for when the affectation was created
  modifiedAt?: string // ISO date string for when the affectation was last modified
  modifiedBy?: string // Email of the user who last modified this record
}