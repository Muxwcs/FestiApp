import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { VolunteerRecord } from '@/types/user.interface'
import { fetchVolunteers, deleteVolunteer, updateVolunteer, createVolunteer } from '@/lib/api/volunteers'
import { toast } from 'sonner'

export function useVolunteersQuery() {
  const queryClient = useQueryClient()

  // ✅ Query for fetching volunteers
  const volunteersQuery = useQuery({
    queryKey: ['volunteers'],
    queryFn: fetchVolunteers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  })

  // ✅ Mutation for deleting
  const deleteMutation = useMutation({
    mutationFn: deleteVolunteer,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['volunteers'], (old: VolunteerRecord[] = []) =>
        old.filter(v => v.id !== deletedId)
      )
      toast.success('Bénévole supprimé avec succès')
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression')
      console.error('Delete failed:', error)
    }
  })

  // ✅ Mutation for updating
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<VolunteerRecord> }) =>
      updateVolunteer(id, updates),
    onSuccess: (updatedVolunteer) => {
      queryClient.setQueryData(['volunteers'], (old: VolunteerRecord[] = []) =>
        old.map(v => v.id === updatedVolunteer.id ? updatedVolunteer : v)
      )
      toast.success('Bénévole mis à jour avec succès')
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour')
      console.error('Update failed:', error)
    }
  })

  return {
    // Query data
    ...volunteersQuery,
    volunteers: volunteersQuery.data || [],

    // Mutations
    deleteVolunteer: deleteMutation.mutate,
    updateVolunteer: updateMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
  }
}