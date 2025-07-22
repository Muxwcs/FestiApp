import { airtableGet, airtableCreate, airtableUpdate, airtableDelete } from './base'
import type { AirtableRecord, QueryOptions } from './types'

const TABLE_NAME = 'Affectations' // Replace with your actual table name

const ALLOWED_FIELDS = [
  'number',
  'volunteer',
  'txand',
  'pole',
  'status',
  'createdAt',
  'modifiedAt',
  'modifiedBy'
]

export const affectations = {
  // Get all affectations
  getAll: async (options: QueryOptions = {}): Promise<AirtableRecord[]> => {
    return airtableGet.all(TABLE_NAME, options)
  },

  // Get affectation by ID
  getById: async (id: string): Promise<AirtableRecord | null> => {
    return airtableGet.byId(TABLE_NAME, id)
  },

  // Get affectations by volunteer ID - using .where instead of .filtered
  getByVolunteer: async (volunteerId: string): Promise<AirtableRecord[]> => {
    const filterFormula = `FIND('${volunteerId}', ARRAYJOIN({volunteer}, ',')) > 0`
    return airtableGet.where(TABLE_NAME, filterFormula)
  },

  // Get affectations by sector ID - using .where instead of .filtered  
  getBySector: async (sectorId: string): Promise<AirtableRecord[]> => {
    const filterFormula = `FIND('${sectorId}', ARRAYJOIN({pole}, ',')) > 0`
    return airtableGet.where(TABLE_NAME, filterFormula)
  },

  // Get first affectation matching criteria
  getFirst: async (filterFormula: string): Promise<AirtableRecord | null> => {
    return airtableGet.first(TABLE_NAME, filterFormula)
  },

  // Create new affectation
  create: async (data: Record<string, unknown>[]): Promise<AirtableRecord[]> => {
    return airtableCreate(TABLE_NAME, data, ALLOWED_FIELDS)
  },

  // Update affectation
  update: async (data: { id: string; fields: Record<string, unknown> }[]): Promise<AirtableRecord[]> => {
    return airtableUpdate(TABLE_NAME, data, ALLOWED_FIELDS)
  },

  // Delete affectations
  delete: async (recordIds: string[]): Promise<{ deletedRecords: string[] }> => {
    return airtableDelete(TABLE_NAME, recordIds)
  }
}