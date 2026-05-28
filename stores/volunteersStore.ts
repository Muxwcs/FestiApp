import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { VolunteerRecord } from '@/types/user.interface'
import { useEffect, useState } from 'react'
import { useVolunteersQuery } from '@/hooks/use-volunteers'

interface VolunteersState {
  volunteers: VolunteerRecord[]
  pagination: any | null  // ✅ Add pagination data
  summary: any | null     // ✅ Add summary data
  loading: boolean
  error: string | null
  lastFetch: Date | null

  setVolunteers: (volunteers: VolunteerRecord[]) => void
  setPagination: (pagination: any) => void      // ✅ Add pagination setter
  setSummary: (summary: any) => void            // ✅ Add summary setter
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
        pagination: null,     // ✅ Add pagination state
        summary: null,        // ✅ Add summary state
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

        // ✅ Add pagination setter
        setPagination: (pagination) => {
          set({ pagination }, false, 'volunteers/setPagination')
        },

        // ✅ Add summary setter
        setSummary: (summary) => {
          set({ summary }, false, 'volunteers/setSummary')
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
          pagination: state.pagination,   // ✅ Persist pagination
          summary: state.summary,         // ✅ Persist summary
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

  // ✅ Sync volunteers and rich data
  useEffect(() => {
    if (query.volunteers && query.volunteers.length > 0 && !hasSynced) {
      store.setVolunteers(query.volunteers)

      // ✅ Sync rich API data
      if (query.pagination) store.setPagination(query.pagination)
      if (query.summary) store.setSummary(query.summary)

      setHasSynced(true)
      console.log('✅ Synced volunteers + rich data from API to store:', query.volunteers.length)
    }
  }, [query.volunteers, query.pagination, query.summary, hasSynced, store])

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
    pagination: query.pagination,     // ✅ Expose pagination
    summary: query.summary,           // ✅ Expose summary

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