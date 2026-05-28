import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCalendarStore } from '@/stores/calendarStore'
import { useEffect } from 'react'

export interface VolunteerTimeslot {
  id: string
  name: string
  dateStart: string
  dateEnd: string
  sectorName: string
  sectorDescription?: string
  sectorColor?: string // ✅ Add new fields from your API
  description?: string
  status: string
  role?: string
  totalVolunteers?: number
  currentVolunteers?: number
  affectationId: string
  timing?: { // ✅ Add timing info from your optimized API
    daysUntilStart: number | null
    hoursUntilStart: number | null
    isToday: boolean
    isTomorrow: boolean
    isThisWeek: boolean
    isPast: boolean
    isUpcoming: boolean
  }
}

export interface VolunteerDataResponse {
  timeslots: VolunteerTimeslot[]
  volunteer?: {
    id: string
    name: string
    email: string
  }
  message?: string // ✅ Handle empty states
  debug?: any // ✅ Development info
}

// ✅ ENHANCED: Better fetch function with timeout and headers
async function fetchVolunteerTimeslots(): Promise<VolunteerDataResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch('/api/volunteers/my-timeslots', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Session expirée - Veuillez vous reconnecter')
      } else if (response.status === 403) {
        throw new Error('Accès non autorisé')
      } else if (response.status === 404) {
        throw new Error('Profil bénévole non trouvé')
      } else if (response.status >= 500) {
        throw new Error('Erreur serveur - Veuillez réessayer plus tard')
      } else {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }
    }

    const data = await response.json()

    // ✅ ENHANCED: Validate response
    if (!data || typeof data !== 'object') {
      throw new Error('Réponse invalide du serveur')
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Délai d\'attente dépassé - Veuillez réessayer')
    }
    throw error
  }
}

// ✅ ENHANCED: Hook with automatic Zustand sync
export function useVolunteerTimeslots() {
  const { data: session, status } = useSession()
  const { setVolunteerTimeslots, setVolunteerLoading, setError } = useCalendarStore()

  const query = useQuery({
    queryKey: ['volunteer-timeslots', session?.user?.email],
    queryFn: fetchVolunteerTimeslots,
    enabled: status === 'authenticated' && !!session?.user?.email,
    staleTime: 2 * 60 * 1000, // 2 minutes (matches your API cache)
    gcTime: 10 * 60 * 1000,   // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry auth errors
      if (error?.message?.includes('401') || error?.message?.includes('403')) {
        return false
      }
      // Retry network errors up to 2 times
      return failureCount < 2
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  })

  // ✅ AUTOMATIC: Sync React Query state with Zustand store
  useEffect(() => {
    if (query.data?.timeslots) {
      setVolunteerTimeslots(query.data.timeslots)
    }
    setVolunteerLoading(query.isLoading)

    if (query.error) {
      setError(query.error instanceof Error ? query.error.message : 'Erreur inconnue')
    } else {
      setError(null)
    }
  }, [query.data, query.isLoading, query.error, setVolunteerTimeslots, setVolunteerLoading, setError])

  return {
    ...query,
    // ✅ ENHANCED: Additional helper properties
    isEmpty: query.data?.timeslots?.length === 0,
    hasMessage: !!query.data?.message,
    message: query.data?.message,
    volunteer: query.data?.volunteer,
  }
}