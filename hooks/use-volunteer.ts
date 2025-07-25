import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { VolunteerRecord } from '@/types/user.interface'
import { toast } from 'sonner'

// ✅ Fetch single volunteer
async function fetchVolunteer(id: string): Promise<VolunteerRecord> {
  const response = await fetch(`/api/volunteers/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch volunteer: ${response.status}`)
  }
  return response.json()
}

// ✅ Update single volunteer
async function updateVolunteer({ id, updates }: { id: string; updates: Partial<VolunteerRecord> }): Promise<VolunteerRecord> {
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

// ✅ Delete single volunteer
async function deleteVolunteer(id: string): Promise<void> {
  const response = await fetch(`/api/volunteers/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error(`Failed to delete volunteer: ${response.status}`)
  }
}

// ✅ Hook for single volunteer
export function useVolunteer(id: string) {
  const queryClient = useQueryClient()

  // Query for fetching single volunteer
  const volunteerQuery = useQuery({
    queryKey: ['volunteer', id],
    queryFn: () => fetchVolunteer(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404 (volunteer not found)
      if (error?.message?.includes('404')) {
        return false
      }
      return failureCount < 2
    }
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: updateVolunteer,
    onSuccess: (updatedVolunteer) => {
      // Update single volunteer cache
      queryClient.setQueryData(['volunteer', id], updatedVolunteer)

      // Update volunteers list cache if it exists
      queryClient.setQueryData(['volunteers'], (old: VolunteerRecord[] | undefined) =>
        old?.map(v => v.id === updatedVolunteer.id ? updatedVolunteer : v) || []
      )

      toast.success('Bénévole mis à jour avec succès')
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour')
      console.error('Update failed:', error)
    }
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteVolunteer,
    onSuccess: () => {
      // Remove from single volunteer cache
      queryClient.removeQueries({ queryKey: ['volunteer', id] })

      // Remove from volunteers list cache
      queryClient.setQueryData(['volunteers'], (old: VolunteerRecord[] | undefined) =>
        old?.filter(v => v.id !== id) || []
      )

      toast.success('Bénévole supprimé avec succès')
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression')
      console.error('Delete failed:', error)
    }
  })

  return {
    // Data
    volunteer: volunteerQuery.data,
    isLoading: volunteerQuery.isLoading,
    error: volunteerQuery.error,

    // Actions
    updateVolunteer: updateMutation.mutate,
    deleteVolunteer: deleteMutation.mutate,
    refetch: volunteerQuery.refetch,

    // Loading states
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Utils
    isNotFound: volunteerQuery.error?.message?.includes('404'),
  }
}