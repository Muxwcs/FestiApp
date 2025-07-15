import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { VolunteerRecord } from '@/types/user.interface'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

interface VolunteersState {
  // State
  volunteers: VolunteerRecord[]
  loading: boolean
  error: string | null
  lastFetch: Date | null

  // Actions
  fetchVolunteers: () => Promise<void>
  addVolunteer: (volunteer: VolunteerRecord) => void
  updateVolunteer: (id: string, updates: Partial<VolunteerRecord>) => void
  deleteVolunteer: (id: string) => Promise<void>
  getVolunteerById: (id: string) => VolunteerRecord | undefined
  clearError: () => void
  forceRefresh: () => Promise<void>
}

export const useVolunteersStore = create<VolunteersState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        volunteers: [],
        loading: false,
        error: null,
        lastFetch: null,

        // Fetch volunteers with caching
        fetchVolunteers: async () => {
          const { lastFetch, loading } = get()

          // Prevent multiple simultaneous requests
          if (loading) return

          // Safe check for lastFetch - handle both Date and string
          const lastFetchTime = lastFetch ? (lastFetch instanceof Date ? lastFetch.getTime() : new Date(lastFetch).getTime()) : 0

          // Cache for 5 minutes - avoid unnecessary refetches
          if (lastFetchTime && Date.now() - lastFetchTime < 5 * 60 * 1000) {
            console.log('📋 Using cached volunteers data')
            return
          }

          console.log('🔄 Fetching volunteers from API...')
          set({ loading: true, error: null }, false, 'volunteers/fetchStart')

          try {
            const response = await fetch('/api/volunteers')
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            set({
              volunteers: data,
              loading: false,
              lastFetch: new Date(),
              error: null
            }, false, 'volunteers/fetchSuccess')
            console.log(`✅ Fetched ${data.length} volunteers`)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('❌ Failed to fetch volunteers:', error)
            set({
              loading: false,
              error: errorMessage
            }, false, 'volunteers/fetchError')
            toast.error('Erreur lors du chargement des bénévoles')
          }
        },

        // Force refresh (bypass cache)
        forceRefresh: async () => {
          console.log('🔄 Force refreshing volunteers...')
          set({ lastFetch: null }, false, 'volunteers/forceRefresh')
          await get().fetchVolunteers()
        },

        // Add new volunteer
        addVolunteer: (volunteer) => {
          set((state) => ({
            volunteers: [...state.volunteers, volunteer]
          }), false, 'volunteers/add')
          console.log('✅ Added volunteer to store:', volunteer.id)
        },

        // Update existing volunteer
        updateVolunteer: (id, updates) => {
          set((state) => ({
            volunteers: state.volunteers.map(volunteer =>
              volunteer.id === id
                ? { ...volunteer, ...updates, fields: { ...volunteer.fields, ...updates.fields } }
                : volunteer
            )
          }), false, `volunteers/update/${id}`)
          console.log('✅ Updated volunteer in store:', id)
        },

        // Delete volunteer
        deleteVolunteer: async (id) => {
          console.log('🗑️ Deleting volunteer:', id)

          try {
            const response = await fetch(`/api/volunteers/${id}`, {
              method: 'DELETE'
            })

            if (!response.ok) {
              throw new Error(`Failed to delete volunteer: ${response.status}`)
            }

            // Remove from store
            set((state) => ({
              volunteers: state.volunteers.filter(volunteer => volunteer.id !== id)
            }), false, `volunteers/delete/${id}`)

            console.log('✅ Deleted volunteer from store:', id)
            toast.success('Bénévole supprimé avec succès')
          } catch (error) {
            console.error('❌ Failed to delete volunteer:', error)
            toast.error('Erreur lors de la suppression')
            throw error // Re-throw so calling component can handle it
          }
        },

        // Get volunteer by ID
        getVolunteerById: (id) => {
          return get().volunteers.find(volunteer => volunteer.id === id)
        },

        // Clear error state
        clearError: () => set({ error: null }, false, 'volunteers/clearError')
      }),
      {
        name: 'volunteers-store', // Storage key name
        storage: createJSONStorage(() => localStorage), // Use localStorage
        partialize: (state) => ({
          // Only persist these fields (exclude loading and error states)
          volunteers: state.volunteers,
          lastFetch: state.lastFetch,
        }),
        // // Custom serializer for Date objects
        // serialize: (state) => {
        //   return JSON.stringify({
        //     ...state,
        //     state: {
        //       ...state.state,
        //       // Convert Date to timestamp for storage
        //       lastFetch: state.state.lastFetch instanceof Date ? state.state.lastFetch.getTime() : state.state.lastFetch
        //     }
        //   })
        // },
        // // Custom deserializer for Date objects
        // deserialize: (str) => {
        //   const parsed = JSON.parse(str)
        //   return {
        //     ...parsed,
        //     state: {
        //       ...parsed.state,
        //       // Convert timestamp back to Date object
        //       lastFetch: parsed.state.lastFetch ? new Date(parsed.state.lastFetch) : null
        //     }
        //   }
        // },
        // // Increase version to force cache refresh
        // version: 2,
        // // Migrate function for version changes
        // migrate: (persistedState: any, version: number) => {
        //   if (version < 2) {
        //     // Clear old cache to avoid Date parsing issues
        //     return {
        //       volunteers: [],
        //       lastFetch: null,
        //     }
        //   }
        //   return persistedState
        // },
      }
    ),
    {
      name: 'VolunteersStore', // DevTools name
      enabled: process.env.NODE_ENV === 'development', // Only in development
    }
  )
)

// Export a hook to check if store is hydrated (useful for SSR)
export const useVolunteersStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubscribe = useVolunteersStore.persist.onFinishHydration(() => {
      setHydrated(true)
    })

    // If already hydrated, set immediately
    if (useVolunteersStore.persist.hasHydrated()) {
      setHydrated(true)
    }

    return unsubscribe
  }, [])

  return hydrated
}

// Helper to manually clear persisted data
export const clearVolunteersStorage = () => {
  useVolunteersStore.persist.clearStorage()
  console.log('🗑️ Cleared volunteers storage')
}