import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { VolunteerRecord } from '@/types/user.interface'
import { useEffect, useState } from 'react'
import { useVolunteersQuery } from '@/hooks/use-volunteers'

interface VolunteersState {
  volunteers: VolunteerRecord[]
  loading: boolean
  error: string | null
  lastFetch: Date | null

  setVolunteers: (volunteers: VolunteerRecord[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addVolunteer: (volunteer: VolunteerRecord) => void
  updateVolunteerInStore: (id: string, updates: Partial<VolunteerRecord>) => void
  removeVolunteer: (id: string) => void
  getVolunteerById: (id: string) => VolunteerRecord | undefined
  clearError: () => void
}

export const useVolunteersStore = create<VolunteersState>()(
  devtools(
    persist(
      (set, get) => ({
        volunteers: [],
        loading: false,
        error: null,
        lastFetch: null,

        setVolunteers: (volunteers) => {
          set({
            volunteers,
            lastFetch: new Date(),
            error: null
          }, false, 'volunteers/setVolunteers')
        },

        setLoading: (loading) => {
          // ✅ Only update if actually different
          const currentLoading = get().loading
          if (currentLoading !== loading) {
            set({ loading }, false, 'volunteers/setLoading')
          }
        },

        setError: (error) => {
          // ✅ Only update if actually different
          const currentError = get().error
          if (currentError !== error) {
            set({ error }, false, 'volunteers/setError')
          }
        },

        addVolunteer: (volunteer) => {
          set((state) => ({
            volunteers: [...state.volunteers, volunteer]
          }), false, 'volunteers/add')
        },

        updateVolunteerInStore: (id, updates) => {
          set((state) => ({
            volunteers: state.volunteers.map(volunteer =>
              volunteer.id === id
                ? { ...volunteer, ...updates, fields: { ...volunteer.fields, ...updates.fields } }
                : volunteer
            )
          }), false, `volunteers/update/${id}`)
        },

        removeVolunteer: (id) => {
          set((state) => ({
            volunteers: state.volunteers.filter(volunteer => volunteer.id !== id)
          }), false, `volunteers/delete/${id}`)
        },

        getVolunteerById: (id) => {
          return get().volunteers.find(volunteer => volunteer.id === id)
        },

        clearError: () => set({ error: null }, false, 'volunteers/clearError')
      }),
      {
        name: 'volunteers-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          // Don't persist loading states
          volunteers: state.volunteers,
          lastFetch: state.lastFetch,
        }),
      }
    ),
    {
      name: 'VolunteersStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)

// ✅ Simplified composite hook - no infinite loops
export function useVolunteers() {
  const store = useVolunteersStore()
  const query = useVolunteersQuery()

  // ✅ Use a ref to track if we've synced to prevent loops
  const [hasSynced, setHasSynced] = useState(false)

  // ✅ Only sync once when data first arrives
  useEffect(() => {
    if (query.data && query.data.length > 0 && !hasSynced) {
      store.setVolunteers(query.data)
      setHasSynced(true)
      console.log('✅ Synced volunteers from API to store:', query.data.length)
    }
  }, [query.data, hasSynced, store])

  // ✅ Sync loading state only when it changes
  useEffect(() => {
    store.setLoading(query.isLoading)
  }, [query.isLoading, store])

  // ✅ Sync error state only when it changes
  useEffect(() => {
    store.setError(query.error?.message || null)
  }, [query.error, store])

  return {
    // Data from React Query (with caching)
    volunteers: query.volunteers || [],
    isLoading: query.isLoading,
    error: query.error,

    // Actions from React Query
    deleteVolunteer: query.deleteVolunteer,
    updateVolunteer: query.updateVolunteer,
    refetch: () => {
      setHasSynced(false) // Reset sync flag
      return query.refetch()
    },

    // Local state from Zustand
    getVolunteerById: store.getVolunteerById,
    clearError: store.clearError,

    // Loading states
    isDeleting: query.isDeleting,
    isUpdating: query.isUpdating,
  }
}

// ✅ Hydration hook
export const useVolunteersStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubscribe = useVolunteersStore.persist.onFinishHydration(() => {
      setHydrated(true)
    })

    if (useVolunteersStore.persist.hasHydrated()) {
      setHydrated(true)
    }

    return unsubscribe
  }, [])

  return hydrated
}