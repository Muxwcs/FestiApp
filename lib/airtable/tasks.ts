import { airtableGet, airtableCreate, airtableUpdate, airtableDelete } from './base'

const TASKS_TABLE = 'Missions'
const TASK_FIELDS = [
  'name',
  'description',
  'dateStart',
  'dateEnd',
  'place',
  'priority',
  'status',
  'humanRessources',
  'assignedMembers',
  'totalAssigned',
  'daysUntilDeadline',
  'duration',  // ✅ Add missing fields
  'Task Completion Summary',
  'Volunteer Skills Summary'
]

export const tasks = {
  getAll: (options = {}) => airtableGet.all(TASKS_TABLE, options),
  getById: (id: string) => airtableGet.byId(TASKS_TABLE, id),
  create: (data: Record<string, unknown>[]) => airtableCreate(TASKS_TABLE, data, TASK_FIELDS),
  update: (data: { id: string; fields: Record<string, unknown> }[]) => airtableUpdate(TASKS_TABLE, data, TASK_FIELDS),
  delete: (ids: string[]) => airtableDelete(TASKS_TABLE, ids),

  getByIds: async (missionsIds: string[]) => {
    return airtableGet.byIds(TASKS_TABLE, missionsIds)
  },

  getByVolunteer: async (volunteerId: string) => {
    // ✅ FIXED: Use ARRAYJOIN for array fields and add > 0
    const filterFormula = `FIND('${volunteerId}', ARRAYJOIN({assignedMembers}, ',')) > 0`
    console.log('🔍 Tasks filter formula:', filterFormula)
    const result = await airtableGet.where(TASKS_TABLE, filterFormula)
    console.log('📊 Tasks result:', result?.length || 0, 'records')
    if (result && result.length > 0) {
      console.log('✅ SUCCESS! Found missions:', result.map(r => r.fields.name))
    }
    return result
  },

  getByEvent: (eventId: string) =>
    airtableGet.where(TASKS_TABLE, `{eventId} = '${eventId}'`),

  updateOne: async (id: string, fields: Record<string, unknown>) => {
    const results = await airtableUpdate(TASKS_TABLE, [{ id, fields }], TASK_FIELDS)
    return results[0]
  },

  createOne: async (fields: Record<string, unknown>) => {
    const results = await airtableCreate(TASKS_TABLE, [fields], TASK_FIELDS)
    return results[0]
  },
  // Enhanced method to get tasks with sector information
  getByVolunteerWithSector: async (volunteerId: string) => {
    try {
      const filterFormula = `FIND('${volunteerId}', ARRAYJOIN({assignedMembers}, ',')) > 0`
      // Remove the 'fields' property if not supported by QueryOptions
      return airtableGet.where(TASKS_TABLE, filterFormula)
    } catch (error) {
      throw new Error(`Failed to fetch tasks for volunteer ${volunteerId}: ${error}`)
    }
  },
  // Debug method to see actual data structure
  debugMissionsStructure: async () => {
    console.log('🔍 Debugging missions table structure...')
    const allMissions = await airtableGet.all(TASKS_TABLE, { maxRecords: 5 })
    console.log('📊 Sample missions:', JSON.stringify(allMissions, null, 2))

    if (allMissions && allMissions.length > 0) {
      console.log('🔑 Available fields in first mission:', Object.keys(allMissions[0].fields))

      // Check assignedMembers field specifically
      const firstMission = allMissions[0]
      console.log('👥 assignedMembers field value:', firstMission.fields.assignedMembers)
      console.log('👥 assignedMembers type:', typeof firstMission.fields.assignedMembers)
    }

    return allMissions
  }

}