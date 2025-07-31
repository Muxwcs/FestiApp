import { create } from 'zustand'
import { createJSONStorage, persist, devtools } from 'zustand/middleware'
import { toast } from 'sonner'
import { cleanSectorData, CleanSectorRecord, SectorRecord } from '@/types/sector.interface'

export interface EnhancedVolunteer {
  id: string
  fields: {
    name?: string
    firstname?: string
    email?: string
    phone?: string
    role?: string
    status?: string
    skills?: string[]
    description?: string
    createdAt?: string
    modifiedAt?: string
  }
  affectations?: any[]
}

export interface SectorVolunteersData {
  volunteers: EnhancedVolunteer[]
  timeslots: Record<string, string>
  allSectorTimeslots: Record<string, any>
  totalTimeslots: number
  lastFetched: number
  loading: boolean
  error: string | null
}

interface SectorsState {
  // State
  sectors: SectorRecord[]
  sectorVolunteers: Record<string, SectorVolunteersData> // Key: sectorId
  referentSectors: SectorRecord[]
  loading: boolean
  error: string | null
  lastFetch: Date | null
  isHydrated: boolean // ✅ Added hydration state

  // Sector CRUD Actions
  fetchSectors: () => Promise<void>
  fetchReferentSectors: () => Promise<void>
  fetchReferentSector: (sectorId: string) => Promise<SectorRecord>
  addSector: (sector: SectorRecord) => void
  updateSector: (id: string, updates: Partial<SectorRecord>) => void
  updateReferentSector: (sectorId: string, updates: Partial<SectorRecord['fields']>) => Promise<SectorRecord>
  deleteSector: (id: string) => Promise<void>
  getSectorById: (id: string) => SectorRecord | undefined
  getReferentSectorById: (id: string) => SectorRecord | undefined
  getCleanSectorById: (id: string) => CleanSectorRecord | undefined // ✅ Added clean version

  // Sector Volunteers Actions
  fetchSectorVolunteers: (sectorId: string, forceRefresh?: boolean) => Promise<void>
  getSectorVolunteers: (sectorId: string) => SectorVolunteersData | null
  clearSectorVolunteersData: (sectorId: string) => void

  // Utility Actions
  clearError: () => void
  forceRefresh: () => Promise<void>
  forceRefreshReferentSectors: () => Promise<void>
}

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export const useSectorsStore = create<SectorsState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        sectors: [],
        sectorVolunteers: {},
        referentSectors: [],
        loading: false,
        error: null,
        lastFetch: null,
        isHydrated: false, // ✅ Initial hydration state

        // Fetch all sectors
        fetchSectors: async () => {
          const { lastFetch, loading } = get()

          if (loading) return

          const lastFetchTime = lastFetch ? (lastFetch instanceof Date ? lastFetch.getTime() : new Date(lastFetch).getTime()) : 0

          if (lastFetchTime && Date.now() - lastFetchTime < CACHE_TTL) {
            console.log('📋 Using cached sectors data')
            return
          }

          console.log('🔄 Fetching sectors from API...')
          set({ loading: true, error: null })

          try {
            const response = await fetch('/api/txands') // Your sectors API endpoint
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            set({
              sectors: data,
              loading: false,
              lastFetch: new Date(),
              error: null
            })
            console.log(`✅ Fetched ${data.length} sectors`)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('❌ Failed to fetch sectors:', error)
            set({
              loading: false,
              error: errorMessage
            })
            toast.error('Erreur lors du chargement des secteurs')
          }
        },

        // ✅ ADD: Get referent sector by ID
        getReferentSectorById: (id: string) => {
          return get().referentSectors.find(sector => sector.id === id)
        },

        fetchReferentSectors: async () => {
          const { lastFetch, loading } = get()

          if (loading) return

          const lastFetchTime = lastFetch ? (lastFetch instanceof Date ? lastFetch.getTime() : new Date(lastFetch).getTime()) : 0

          if (lastFetchTime && Date.now() - lastFetchTime < CACHE_TTL) {
            console.log('📋 Using cached sectors data')
            return
          }

          console.log('🔄 Fetching sectors from API...')
          set({ loading: true, error: null })

          try {
            // ✅ OPTION 1: Use dedicated referent route
            const response = await fetch('/api/referent/sectors')

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            set({
              referentSectors: data,
              loading: false,
              lastFetch: new Date(),
              error: null
            })
            console.log(`✅ Fetched ${data.length} sectors`)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('❌ Failed to fetch sectors:', error)
            set({
              loading: false,
              error: errorMessage
            })
            toast.error('Erreur lors du chargement des secteurs')
          }
        },

        // ✅ ADD: Fetch single referent sector
        fetchReferentSector: async (sectorId: string): Promise<SectorRecord> => {
          console.log('🔄 Fetching single referent sector:', sectorId)
          set({ loading: true, error: null })

          try {
            const response = await fetch(`/api/referent/${sectorId}`)

            if (!response.ok) {
              if (response.status === 404) {
                throw new Error('Sector not found')
              }
              if (response.status === 403) {
                throw new Error('You do not have access to this sector')
              }
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const sector = await response.json()

            // ✅ Update the specific sector in referentSectors array
            set((state) => {
              const existingIndex = state.referentSectors.findIndex(s => s.id === sectorId)

              if (existingIndex >= 0) {
                // Update existing
                const updatedSectors = [...state.referentSectors]
                updatedSectors[existingIndex] = sector
                return {
                  referentSectors: updatedSectors,
                  loading: false,
                  error: null
                }
              } else {
                // Add new
                return {
                  referentSectors: [...state.referentSectors, sector],
                  loading: false,
                  error: null
                }
              }
            })

            console.log('✅ Fetched referent sector:', sector)
            return sector

          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.error('❌ Failed to fetch referent sector:', error)
            set({
              loading: false,
              error: errorMessage
            })
            throw error
          }
        },

        // ✅ ADD: Update referent sector
        updateReferentSector: async (sectorId: string, updates: Partial<SectorRecord['fields']>): Promise<SectorRecord> => {
          console.log('🔄 Updating referent sector:', sectorId, updates)

          try {
            const response = await fetch(`/api/referent/${sectorId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updates),
            })

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const updatedSector = await response.json()

            // ✅ Update in referentSectors array
            set((state) => {
              const updatedSectors = state.referentSectors.map(sector =>
                sector.id === sectorId ? updatedSector : sector
              )
              return { referentSectors: updatedSectors }
            })

            console.log('✅ Updated referent sector:', updatedSector)
            toast.success('Secteur mis à jour avec succès')
            return updatedSector

          } catch (error) {
            console.error('❌ Failed to update referent sector:', error)
            toast.error('Erreur lors de la mise à jour')
            throw error
          }
        },

        // Fetch volunteers for a specific sector
        fetchSectorVolunteers: async (sectorId: string, forceRefresh = false) => {
          const state = get()
          const existing = state.sectorVolunteers[sectorId]

          // Check if we need to fetch
          const needsFetch = !existing ||
            Date.now() - existing.lastFetched > CACHE_TTL ||
            forceRefresh

          if (!needsFetch && !existing.loading) {
            console.log('🎯 Using cached volunteers data for sector:', sectorId)
            return
          }

          // Set loading state for this sector
          set((state) => ({
            sectorVolunteers: {
              ...state.sectorVolunteers,
              [sectorId]: {
                ...existing,
                loading: true,
                error: null
              }
            }
          }))

          try {
            console.log('📡 Fetching volunteers for sector:', sectorId)
            const response = await fetch(`/api/txands/${sectorId}/volunteers`)

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            // Update store with fresh data
            set((state) => ({
              sectorVolunteers: {
                ...state.sectorVolunteers,
                [sectorId]: {
                  ...data,
                  lastFetched: Date.now(),
                  loading: false,
                  error: null
                }
              }
            }))

            console.log(`✅ Fetched ${data.volunteers?.length || 0} volunteers for sector ${sectorId}`)

          } catch (error) {
            console.error('❌ Error fetching sector volunteers:', error)

            set((state) => ({
              sectorVolunteers: {
                ...state.sectorVolunteers,
                [sectorId]: {
                  ...existing,
                  loading: false,
                  error: error instanceof Error ? error.message : 'Unknown error'
                }
              }
            }))

            toast.error('Erreur lors du chargement des bénévoles du secteur')
          }
        },

        // Get volunteers data for a sector
        getSectorVolunteers: (sectorId: string) => {
          return get().sectorVolunteers[sectorId] || null
        },

        // Clear volunteers data for a sector
        clearSectorVolunteersData: (sectorId: string) => {
          set((state) => {
            const newSectorVolunteers = { ...state.sectorVolunteers }
            delete newSectorVolunteers[sectorId]
            return { sectorVolunteers: newSectorVolunteers }
          })
        },

        // Add new sector
        addSector: (sector) => {
          set((state) => ({
            sectors: [...state.sectors, sector]
          }))
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
          }))
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
            }))

            // Also clear volunteers data for this sector
            get().clearSectorVolunteersData(id)

            console.log('✅ Deleted sector from store:', id)
            toast.success('Secteur supprimé avec succès')
          } catch (error) {
            console.error('❌ Failed to delete sector:', error)
            toast.error('Erreur lors de la suppression')
            throw error
          }
        },

        // Get sector by ID
        getSectorById: (id) => {
          return get().sectors.find(sector => sector.id === id)
        },

        // ✅ ADDED: Get clean sector by ID (nulls converted to undefined)
        getCleanSectorById: (id) => {
          const sector = get().sectors.find(sector => sector.id === id)
          return sector ? cleanSectorData(sector) : undefined
        },

        // Force refresh all data
        forceRefresh: async () => {
          console.log('🔄 Force refreshing sectors...')
          set({ lastFetch: null })
          await get().fetchSectors()
        },

        forceRefreshReferentSectors: async () => {
          console.log('🔄 Force refreshing referent sectors...')
          set({ lastFetch: null })
          await get().fetchReferentSectors()
        },

        // Clear error state
        clearError: () => set({ error: null })
      }),
      {
        name: 'sectors-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          sectors: state.sectors,
          sectorVolunteers: state.sectorVolunteers,
          lastFetch: state.lastFetch
        }),
        onRehydrateStorage: () => (state) => {
          // Set hydration state to true after rehydration
          if (state) {
            state.isHydrated = true
            console.log('✅ Sectors store rehydrated')
          }
        }
      }
    ),
    {
      name: 'SectorsStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)