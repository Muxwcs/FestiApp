import { airtableGet, airtableCreate, airtableUpdate, airtableDelete } from './base'
import type { AirtableRecord, QueryOptions } from './types'

const TABLE_NAME = 'Membres' // Your actual table name

const ALLOWED_FIELDS = [
  'name',
  'surname',
  'email',
  'phone',
  'role',
  'status',
  'skills',
  'availability',
  'assignedTasks',
  'notes',
  'avatar',
  'firebaseUid'
]

export const volunteers = {
  // Basic CRUD
  create: (data: Record<string, unknown>[]) => airtableCreate(TABLE_NAME, data, ALLOWED_FIELDS),
  update: (data: { id: string; fields: Record<string, unknown> }[]) => airtableUpdate(TABLE_NAME, data, ALLOWED_FIELDS),
  delete: (ids: string[]) => airtableDelete(TABLE_NAME, ids),

  getActive: () =>
    airtableGet.where(TABLE_NAME, `{status} = 'actif'`),

  getByRole: (role: string) =>
    airtableGet.where(TABLE_NAME, `{role} = '${role}'`),

  // Get all volunteers
  getAll: async (options: QueryOptions = {}): Promise<AirtableRecord[]> => {
    return airtableGet.all(TABLE_NAME, options)
  },

  // Get volunteer by ID
  getById: async (id: string): Promise<AirtableRecord | null> => {
    return airtableGet.byId(TABLE_NAME, id)
  },

  // Get volunteer by Firebase UID
  getByFirebaseUid: async (firebaseUid: string): Promise<AirtableRecord | null> => {
    const filterFormula = `{firebaseUid} = '${firebaseUid}'`
    return airtableGet.first(TABLE_NAME, filterFormula)
  },

  // Get volunteers by email
  getByEmail: async (email: string): Promise<AirtableRecord | null> => {
    const filterFormula = `{email} = '${email}'`
    return airtableGet.first(TABLE_NAME, filterFormula)
  },

  // Create one volunteer
  createOne: async (data: Record<string, unknown>): Promise<AirtableRecord> => {
    const records = await airtableCreate(TABLE_NAME, [data], ALLOWED_FIELDS)
    return records[0]
  },

  // Create multiple volunteers
  createMany: async (data: Record<string, unknown>[]): Promise<AirtableRecord[]> => {
    return airtableCreate(TABLE_NAME, data, ALLOWED_FIELDS)
  },

  // Update one volunteer - FIX THIS METHOD
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

  // Update multiple volunteers
  updateMany: async (data: Array<{ id: string; fields: Record<string, unknown> }>): Promise<AirtableRecord[]> => {
    const records = await airtableUpdate(TABLE_NAME, data, ALLOWED_FIELDS)
    if (!records) {
      throw new Error('No records returned from airtableUpdate')
    }
    return records
  },

  // Delete one volunteer
  deleteOne: async (id: string): Promise<{ deletedRecords: string[] }> => {
    return airtableDelete(TABLE_NAME, [id])
  },

  // Delete multiple volunteers
  deleteMany: async (ids: string[]): Promise<{ deletedRecords: string[] }> => {
    return airtableDelete(TABLE_NAME, ids)
  }
}