import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export interface VolunteerTimeslot {
  id: string
  name: string
  dateStart: string
  dateEnd: string
  sectorName: string
  sectorDescription?: string
  description?: string
  status: string
  role?: string
  totalVolunteers?: number
  currentVolunteers?: number
  affectationId: string
}

export interface VolunteerDataResponse {
  timeslots: VolunteerTimeslot[]
  volunteer?: {
    id: string
    name: string
    email: string
  }
}

// Fetch function for volunteer timeslots
async function fetchVolunteerTimeslots(): Promise<VolunteerDataResponse> {
  const response = await fetch('/api/volunteers/my-timeslots')

  if (!response.ok) {
    throw new Error(`Failed to fetch volunteer timeslots: ${response.status}`)
  }

  return response.json()
}

export function useVolunteerTimeslots() {
  const { data: session, status } = useSession()

  return useQuery({
    queryKey: ['volunteer-timeslots', session?.user?.email],
    queryFn: fetchVolunteerTimeslots,
    enabled: status === 'authenticated' && !!session?.user?.email,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    retry: (failureCount, error: any) => {
      if (error?.message?.includes('401') || error?.message?.includes('403')) {
        return false
      }
      return failureCount < 2
    },
  })
}