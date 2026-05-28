import { airtableGet, airtableCreate, airtableUpdate, airtableDelete } from './base'
import type { AirtableRecord, QueryOptions } from './types'

const TABLE_NAME = 'Poles' // Your actual table name

const ALLOWED_FIELDS = [
  'name',
  'description',
  'referent',
  'txands',
  'skills',
  'affectations',
  'totalNeeds',
  'totalVolunteers',
  'createdAt',
  'modifiedAt',
  'modifiedBy'
]

export const sectors = {
  // Basic CRUD
  create: (data: Record<string, unknown>[]) => airtableCreate(TABLE_NAME, data, ALLOWED_FIELDS),
  update: (data: { id: string; fields: Record<string, unknown> }[]) => airtableUpdate(TABLE_NAME, data, ALLOWED_FIELDS),
  delete: (ids: string[]) => airtableDelete(TABLE_NAME, ids),

  // Get all sectors
  getAll: async (options: QueryOptions = {}): Promise<AirtableRecord[]> => {
    return airtableGet.all(TABLE_NAME, options)
  },

  // Get sector by ID
  getById: async (id: string): Promise<AirtableRecord | null> => {
    return airtableGet.byId(TABLE_NAME, id)
  },

  // ✅ ADD EFFICIENT BATCH RETRIEVAL
  getByIds: async (sectorIds: string[]): Promise<AirtableRecord[]> => {
    if (!sectorIds.length) return []
    return airtableGet.byIds(TABLE_NAME, sectorIds)
  },

  // Get sectors by email
  getByEmail: async (email: string): Promise<AirtableRecord | null> => {
    const filterFormula = `{email} = '${email}'`
    return airtableGet.first(TABLE_NAME, filterFormula)
  },

  // Create one sector
  createOne: async (data: Record<string, unknown>): Promise<AirtableRecord> => {
    const records = await airtableCreate(TABLE_NAME, [data], ALLOWED_FIELDS)
    return records[0]
  },

  // Create multiple sectors
  createMany: async (data: Record<string, unknown>[]): Promise<AirtableRecord[]> => {
    return airtableCreate(TABLE_NAME, data, ALLOWED_FIELDS)
  },

  // Update one sector - FIX THIS METHOD
  updateOne: async (id: string, fieldsData: Record<string, unknown>): Promise<AirtableRecord> => {

    const updateData = [{
      id: id,
      fields: fieldsData
    }]

    const records = await airtableUpdate(TABLE_NAME, updateData, ALLOWED_FIELDS)
    if (records && records.length > 0) {
      return records[0]
    }
    throw new Error('No records returned from airtableUpdate')
  },

  // Update multiple sectors
  updateMany: async (data: Array<{ id: string; fields: Record<string, unknown> }>): Promise<AirtableRecord[]> => {
    const records = await airtableUpdate(TABLE_NAME, data, ALLOWED_FIELDS)
    if (!records) {
      throw new Error('No records returned from airtableUpdate')
    }
    return records
  },

  // Delete one sector
  deleteOne: async (id: string): Promise<{ deletedRecords: string[] }> => {
    return airtableDelete(TABLE_NAME, [id])
  },

  // Delete multiple sectors
  deleteMany: async (ids: string[]): Promise<{ deletedRecords: string[] }> => {
    return airtableDelete(TABLE_NAME, ids)
  }
}