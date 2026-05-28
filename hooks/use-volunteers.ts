import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VolunteerRecord } from '@/types/user.interface'

interface VolunteersApiResponse {
  volunteers: VolunteerRecord[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
    startIndex: number
    endIndex: number
  }
  filters: {
    search: string
    status: string
    sortBy: string
    sortOrder: string
    includeInactive: boolean
  }
  summary: {
    activeVolunteers: number
    totalVolunteers: number
    referents: number
    newVolunteers: number
  }
}

export function useVolunteersQuery() {
  const queryClient = useQueryClient()

  // ✅ Main volunteers query with new API structure
  const volunteersQuery = useQuery({
    queryKey: ['volunteers'],
    queryFn: async (): Promise<VolunteersApiResponse> => {
      const response = await fetch('/api/volunteers')
      if (!response.ok) {
        throw new Error(`Failed to fetch volunteers: ${response.statusText}`)
      }
      const data = await response.json()

      return data
    },
    staleTime: 2 * 60 * 1000, // 2 minutes to match API cache
    gcTime: 5 * 60 * 1000,   // 5 minutes for garbage collection
  })

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (volunteerId: string) => {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete volunteer: ${response.statusText}`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] })
    },
  })

  // ✅ Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`Failed to update volunteer: ${response.statusText}`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] })
    },
  })

  return {
    // ✅ Extract volunteers array from new API response structure
    volunteers: volunteersQuery.data?.volunteers || [],

    // ✅ Expose rich API response data
    pagination: volunteersQuery.data?.pagination,
    filters: volunteersQuery.data?.filters,
    summary: volunteersQuery.data?.summary,

    // ✅ Original response for backwards compatibility
    data: volunteersQuery.data?.volunteers || [],

    // Query states
    isLoading: volunteersQuery.isLoading,
    error: volunteersQuery.error,
    isError: volunteersQuery.isError,

    // Mutation functions
    deleteVolunteer: deleteMutation.mutate,
    updateVolunteer: updateMutation.mutate,

    // Mutation states
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,

    // Refetch function
    refetch: volunteersQuery.refetch,
  }
}