import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { toast } from 'sonner'
import { SectorRecord } from '@/types/sector.interface'
import { useEffect, useState } from 'react'

interface SectorsState {
  // State
  sectors: SectorRecord[]
  loading: boolean
  error: string | null
  lastFetch: Date | null

  // Actions
  fetchSectors: () => Promise<void>
  addSector: (sector: SectorRecord) => void
  updateSector: (id: string, updates: Partial<SectorRecord>) => void
  deleteSector: (id: string) => Promise<void>
  getSectorById: (id: string) => SectorRecord | undefined
  clearError: () => void
  forceRefresh: () => Promise<void>
}

export const useSectorsStore = create<SectorsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        sectors: [],
        loading: false,
        error: null,
        lastFetch: null,

        // Fetch sectors with caching
        fetchSectors: async () => {
          const { lastFetch, loading } = get()

          // Prevent multiple simultaneous requests
          if (loading) return

          // Safe check for lastFetch - handle both Date and string
          const lastFetchTime = lastFetch ? (lastFetch instanceof Date ? lastFetch.getTime() : new Date(lastFetch).getTime()) : 0

          // Cache for 5 minutes - avoid unnecessary refetches
          if (lastFetchTime && Date.now() - lastFetchTime < 5 * 60 * 1000) {
            console.log('📋 Using cached sectors data')
            return
          }

          console.log('🔄 Fetching sectors from API...')
          set({ loading: true, error: null }, false, 'sectors/fetchStart')

          try {
            const response = await fetch('/api/txands')
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            set({
              sectors: data,
              loading: false,
              lastFetch: new Date(),
              error: null
            }, false, 'sectors/fetchSuccess')
            console.log(`✅ Fetched ${data.length} sectors`)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('❌ Failed to fetch sectors:', error)
            set({
              loading: false,
              error: errorMessage
            }, false, 'sectors/fetchError')
            toast.error('Erreur lors du chargement des bénévoles')
          }
        },

        // Force refresh (bypass cache)
        forceRefresh: async () => {
          console.log('🔄 Force refreshing sectors...')
          set({ lastFetch: null }, false, 'sectors/forceRefresh')
          await get().fetchSectors()
        },

        // Add new sector
        addSector: (sector) => {
          set((state) => ({
            sectors: [...state.sectors, sector]
          }), false, 'sectors/add')
          console.log('✅ Added sector to store:', sector.id)
        },

        // Update existing sector
        updateSector: (id, updates) => {
          set((state) => ({
            sectors: state.sectors.map(sector =>
              sector.id === id
                ? { ...sector, ...updates, fields: { ...sector.fields, ...updates.fields } }
                : sector
            )
          }), false, `sectors/update/${id}`)
          console.log('✅ Updated sector in store:', id)
        },

        // Delete sector
        deleteSector: async (id) => {
          console.log('🗑️ Deleting sector:', id)

          try {
            const response = await fetch(`/api/txands/${id}`, {
              method: 'DELETE'
            })

            if (!response.ok) {
              throw new Error(`Failed to delete sector: ${response.status}`)
            }

            // Remove from store
            set((state) => ({
              sectors: state.sectors.filter(sector => sector.id !== id)
            }), false, `sectors/delete/${id}`)

            console.log('✅ Deleted sector from store:', id)
            toast.success('Bénévole supprimé avec succès')
          } catch (error) {
            console.error('❌ Failed to delete sector:', error)
            toast.error('Erreur lors de la suppression')
            throw error // Re-throw so calling component can handle it
          }
        },

        // Get sector by ID
        getSectorById: (id) => {
          return get().sectors.find(sector => sector.id === id)
        },

        // Clear error state
        clearError: () => set({ error: null }, false, 'sectors/clearError')
      }),
      {
        name: 'sectors-store', // Storage key name
        storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      }
    ),
    {
      name: 'VolunteersStore', // DevTools name
      enabled: process.env.NODE_ENV === 'development', // Only in development
    }
  )
)

// Export a hook to check if store is hydrated (useful for SSR)
export const useSectorsStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubscribe = useSectorsStore.persist.onFinishHydration(() => {
      setHydrated(true)
    })

    // If already hydrated, set immediately
    if (useSectorsStore.persist.hasHydrated()) {
      setHydrated(true)
    }

    return unsubscribe
  }, [])

  return hydrated
}

// Helper to manually clear persisted data
export const clearVolunteersStorage = () => {
  useSectorsStore.persist.clearStorage()
  console.log('🗑️ Cleared volunteers storage')
}