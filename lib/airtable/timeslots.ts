import { airtableGet } from './base'
import type { AirtableRecord, QueryOptions } from './types'

const TABLE_NAME = 'Creneaux' // Your actual table name

export const timeslots = {
  // Get all timeslots
  getAll: async (options: QueryOptions = {}): Promise<AirtableRecord[]> => {
    return airtableGet.all(TABLE_NAME, options)
  },

  // Get timeslot by ID
  getById: async (id: string): Promise<AirtableRecord | null> => {
    return airtableGet.byId(TABLE_NAME, id)
  },

  // Get multiple timeslots by IDs
  getByIds: async (ids: string[]): Promise<AirtableRecord[]> => {
    if (ids.length === 0) return []

    const timeslotsData = []
    for (const id of ids) {
      try {
        const timeslot = await timeslots.getById(id)
        if (timeslot) {
          timeslotsData.push(timeslot)
        }
      } catch (error) {
        console.warn(`Failed to fetch timeslot ${id}:`, error)
      }
    }
    return timeslotsData
  },

  // Get first timeslot matching criteria
  getFirst: async (filterFormula: string): Promise<AirtableRecord | null> => {
    return airtableGet.first(TABLE_NAME, filterFormula)
  }
}