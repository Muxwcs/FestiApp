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

  // Simple method using IDs from volunteer data
  getByIds: async (affectationIds: string[]) => {
    return airtableGet.byIds(TABLE_NAME, affectationIds)
  },

  // // Get affectations by volunteer ID - using .where instead of .filtered
  getByVolunteer: async (volunteerId: string): Promise<AirtableRecord[]> => {
    // ✅ ALREADY CORRECT: This one should work
    const filterFormula = `FIND('${volunteerId}', ARRAYJOIN({volunteer}, ',')) > 0`
    console.log('🔍 Affectations filter formula:', filterFormula)
    const result = await airtableGet.where(TABLE_NAME, filterFormula)
    console.log('📊 Affectations result:', result?.length || 0, 'records')
    return result
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
  },

  // Debug method to see actual data structure  
  debugAffectationsStructure: async () => {
    console.log('🔍 Debugging affectations table structure...')
    const allAffectations = await airtableGet.all(TABLE_NAME, { maxRecords: 5 })
    console.log('📊 Sample affectations:', JSON.stringify(allAffectations, null, 2))

    if (allAffectations && allAffectations.length > 0) {
      console.log('🔑 Available fields in first affectation:', Object.keys(allAffectations[0].fields))

      // Check volunteer field specifically
      const firstAffectation = allAffectations[0]
      console.log('👤 volunteer field value:', firstAffectation.fields.volunteer)
      console.log('👤 volunteer type:', typeof firstAffectation.fields.volunteer)
    }

    return allAffectations
  }
}