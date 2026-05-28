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

  // ✅ ADD EFFICIENT BATCH RETRIEVAL
  getByIds: async (timeslotIds: string[]): Promise<AirtableRecord[]> => {
    if (!timeslotIds.length) return []
    return airtableGet.byIds(TABLE_NAME, timeslotIds)
  },

  // Get first timeslot matching criteria
  getFirst: async (filterFormula: string): Promise<AirtableRecord | null> => {
    return airtableGet.first(TABLE_NAME, filterFormula)
  }
}