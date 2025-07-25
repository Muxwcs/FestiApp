import { VolunteerRecord } from '@/types/user.interface'

export interface VolunteersAPI {
  fetchVolunteers: () => Promise<VolunteerRecord[]>
  deleteVolunteer: (id: string) => Promise<void>
  updateVolunteer: (id: string, updates: Partial<VolunteerRecord>) => Promise<VolunteerRecord>
  createVolunteer: (volunteer: Omit<VolunteerRecord, 'id'>) => Promise<VolunteerRecord>
}

// ✅ Fetch all volunteers
export async function fetchVolunteers(): Promise<VolunteerRecord[]> {
  const response = await fetch('/api/volunteers')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// ✅ Delete volunteer
export async function deleteVolunteer(id: string): Promise<void> {
  const response = await fetch(`/api/volunteers/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error(`Failed to delete volunteer: ${response.status}`)
  }
}

// ✅ Update volunteer
export async function updateVolunteer(id: string, updates: Partial<VolunteerRecord>): Promise<VolunteerRecord> {
  const response = await fetch(`/api/volunteers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  if (!response.ok) {
    throw new Error(`Failed to update volunteer: ${response.status}`)
  }
  return response.json()
}

// ✅ Create volunteer
export async function createVolunteer(volunteer: Omit<VolunteerRecord, 'id'>): Promise<VolunteerRecord> {
  const response = await fetch('/api/volunteers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(volunteer)
  })
  if (!response.ok) {
    throw new Error(`Failed to create volunteer: ${response.status}`)
  }
  return response.json()
}