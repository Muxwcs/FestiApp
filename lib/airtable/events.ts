import { airtableGet, airtableCreate, airtableUpdate, airtableDelete } from './base'

const EVENTS_TABLE = 'Events'
const EVENT_FIELDS = ['name', 'date', 'location', 'description', 'status']

export const events = {
  getAll: (options = {}) => airtableGet.all(EVENTS_TABLE, options),
  getById: (id: string) => airtableGet.byId(EVENTS_TABLE, id),
  create: (data: Record<string, unknown>[]) => airtableCreate(EVENTS_TABLE, data, EVENT_FIELDS),
  update: (data: { id: string; fields: Record<string, unknown> }[]) => airtableUpdate(EVENTS_TABLE, data, EVENT_FIELDS),
  delete: (ids: string[]) => airtableDelete(EVENTS_TABLE, ids),

  getUpcoming: () => {
    const today = new Date().toISOString().split('T')[0]
    return airtableGet.where(EVENTS_TABLE, `{date} >= '${today}'`, {
      sort: [{ field: 'date', direction: 'asc' }]
    })
  },

  updateOne: async (id: string, fields: Record<string, unknown>) => {
    const results = await airtableUpdate(EVENTS_TABLE, [{ id, fields }], EVENT_FIELDS)
    return results[0]
  },

  createOne: async (fields: Record<string, unknown>) => {
    const results = await airtableCreate(EVENTS_TABLE, [fields], EVENT_FIELDS)
    return results[0]
  }
}