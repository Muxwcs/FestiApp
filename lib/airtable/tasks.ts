import { airtableGet, airtableCreate, airtableUpdate, airtableDelete } from './base'

const TASKS_TABLE = 'Tasks'
const TASK_FIELDS = ['name', 'description', 'status', 'assignedVolunteers', 'eventId']

export const tasks = {
  getAll: (options = {}) => airtableGet.all(TASKS_TABLE, options),
  getById: (id: string) => airtableGet.byId(TASKS_TABLE, id),
  create: (data: Record<string, unknown>[]) => airtableCreate(TASKS_TABLE, data, TASK_FIELDS),
  update: (data: { id: string; fields: Record<string, unknown> }[]) => airtableUpdate(TASKS_TABLE, data, TASK_FIELDS),
  delete: (ids: string[]) => airtableDelete(TASKS_TABLE, ids),

  getByVolunteer: (volunteerId: string) =>
    airtableGet.where(TASKS_TABLE, `FIND('${volunteerId}', {assignedVolunteers})`),

  getByEvent: (eventId: string) =>
    airtableGet.where(TASKS_TABLE, `{eventId} = '${eventId}'`),

  updateOne: async (id: string, fields: Record<string, unknown>) => {
    const results = await airtableUpdate(TASKS_TABLE, [{ id, fields }], TASK_FIELDS)
    return results[0]
  },

  createOne: async (fields: Record<string, unknown>) => {
    const results = await airtableCreate(TASKS_TABLE, [fields], TASK_FIELDS)
    return results[0]
  }
}