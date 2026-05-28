import { useQuery } from '@tanstack/react-query'
import { MissionRecord } from '@/types/missions.interface'
import { AffectationRecord } from '@/types/affectation.interface'

export function useVolunteerMissions(volunteerId: string) {
  return useQuery({
    queryKey: ['volunteer-missions', volunteerId],
    queryFn: async () => {
      const response = await fetch(`/api/volunteers/${volunteerId}/missions`)
      if (!response.ok) throw new Error('Failed to fetch missions')
      return response.json() as Promise<MissionRecord[]>
    },
    enabled: !!volunteerId
  })
}

export function useVolunteerAssignments(volunteerId: string) {
  return useQuery({
    queryKey: ['volunteer-assignments', volunteerId],
    queryFn: async () => {
      const response = await fetch(`/api/volunteers/${volunteerId}/assignments`)
      if (!response.ok) throw new Error('Failed to fetch assignments')
      return response.json() as Promise<AffectationRecord[]>
    },
    enabled: !!volunteerId
  })
}