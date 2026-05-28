import Airtable, { FieldSet, Record as AirtableBaseRecord } from 'airtable'
import { logger } from '../logger'
import { sanitizeInput } from '../security'
import type { AirtableRecord, QueryOptions, UpdateData } from './types'

// Add proper type for select options
interface SelectOptions {
  maxRecords?: number
  pageSize?: number
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>
  filterByFormula?: string
  view?: string
}

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
export const base = airtable.base(process.env.AIRTABLE_BASE_ID!)

// Utility functions
const sanitizeFields = (fields: Record<string, unknown>, allowedFields: string[] = []): Record<string, unknown> => {
  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(fields)) {
    if (allowedFields.length === 0 || allowedFields.includes(key)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value)
      } else {
        sanitized[key] = value
      }
    }
  }

  return sanitized
}

const handleAirtableError = (error: unknown, operation: string, tableName: string): never => {
  logger.error(`Airtable ${operation} failed for ${tableName}`, error)

  if (error && typeof error === 'object' && 'error' in error && 'message' in error && 'statusCode' in error) {
    throw error // Already formatted Airtable error
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  throw new Error(`${operation} failed: ${errorMessage}`)
}

// Core CRUD functions
export const airtableGet = {
  all: async (tableName: string, options: QueryOptions = {}): Promise<AirtableRecord[]> => {
    try {
      logger.info(`Fetching all records from ${tableName}`, { options })

      // Build select options, only including defined values
      const selectOptions: SelectOptions = {
        maxRecords: options.maxRecords || 100,
        pageSize: options.pageSize || 100,
      }

      // Only add these properties if they have values
      if (options.sort && options.sort.length > 0) {
        selectOptions.sort = options.sort
      }

      if (options.filterByFormula) {
        selectOptions.filterByFormula = options.filterByFormula
      }

      if (options.view) {
        selectOptions.view = options.view
      }

      const records = await base(tableName).select(selectOptions).all()

      const formattedRecords = records.map(record => ({
        id: record.id,
        fields: record.fields,
        createdAt: record.get('createdAt') as string,
      }))

      logger.info(`Retrieved ${formattedRecords.length} records from ${tableName}`)
      return formattedRecords
    } catch (error) {
      handleAirtableError(error, 'GET ALL', tableName)
    }
    // This line ensures a return value in all code paths, though handleAirtableError always throws.
    return []
  },

  byId: async (tableName: string, recordId: string): Promise<AirtableRecord | null> => {
    try {
      if (!recordId) {
        throw new Error('Record ID is required')
      }

      logger.info(`Fetching record ${recordId} from ${tableName}`)

      const record = await base(tableName).find(recordId)

      const formattedRecord = {
        id: record.id,
        fields: record.fields,
        createdAt: record.get('createdAt') as string,
      }

      logger.info(`Retrieved record ${recordId} from ${tableName}`)
      return formattedRecord
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'statusCode' in error &&
        (error as { statusCode?: number }).statusCode === 404
      ) {
        logger.warn(`Record ${recordId} not found in ${tableName}`)
        return null
      }
      handleAirtableError(error, 'GET BY ID', tableName)
    }
    return null
  },

  byIds: async (tableName: string, recordIds: string[]): Promise<AirtableRecord[]> => {
    try {
      if (!recordIds || recordIds.length === 0) {
        logger.info(`No record IDs provided for ${tableName}`)
        return []
      }

      logger.info(`Fetching ${recordIds.length} records by IDs from ${tableName}`, { recordIds })

      // Airtable supports batch retrieval with multiple IDs
      const records = await Promise.all(
        recordIds.map(id => base(tableName).find(id).catch(error => {
          logger.warn(`Record ${id} not found in ${tableName}`, error)
          return null
        }))
      )

      // Filter out null records (not found) and format
      const formattedRecords = records
        .filter((record): record is NonNullable<typeof record> => record !== null)
        .map(record => ({
          id: record.id,
          fields: record.fields,
          createdAt: record.get('createdAt') as string,
        }))

      logger.info(`Retrieved ${formattedRecords.length} records from ${tableName}`)
      return formattedRecords
    } catch (error) {
      handleAirtableError(error, 'GET BY IDS', tableName)
    }
    return []
  },

  where: async (tableName: string, filterByFormula: string, options: Omit<QueryOptions, 'filterByFormula'> = {}): Promise<AirtableRecord[]> => {
    return airtableGet.all(tableName, { ...options, filterByFormula })
  },

  first: async (tableName: string, filterByFormula: string): Promise<AirtableRecord | null> => {
    const records = await airtableGet.where(tableName, filterByFormula, { maxRecords: 1 })
    return records.length > 0 ? records[0] : null
  }
}

export const airtableCreate = async (
  tableName: string,
  data: Record<string, unknown>[],
  allowedFields: string[] = []
): Promise<AirtableRecord[]> => {
  try {
    const sanitizedData = data.map(record => sanitizeFields(record, allowedFields))

    logger.info(`Creating ${data.length} records in ${tableName}`)

    const createData = sanitizedData.map(fields => ({ fields: fields as Partial<FieldSet> }))
    const createdRecords = await base(tableName).create(createData)

    const formattedRecords = createdRecords.map(record => ({
      id: record.id,
      fields: record.fields,
      createdAt: record.get('createdAt') as string,
    }))

    logger.info(`Created ${formattedRecords.length} records in ${tableName}`)
    return formattedRecords
  } catch (error) {
    handleAirtableError(error, 'CREATE', tableName)
    // The above function always throws, but to satisfy TypeScript, return an empty array here.
    return []
  }
}

export const airtableUpdate = async (
  tableName: string,
  data: UpdateData[],
  allowedFields: string[] = []
): Promise<AirtableRecord[]> => {
  try {
    const sanitizedData = data.map(record => ({
      id: record.id,
      fields: sanitizeFields(record.fields, allowedFields) as Partial<FieldSet>
    }))

    logger.info(`Updating ${data.length} records in ${tableName}`)

    // Type the update operation properly
    const table = base(tableName)
    const updatedRecords = await table.update(sanitizedData) as AirtableBaseRecord<FieldSet>[]

    const formattedRecords = updatedRecords.map((record: AirtableBaseRecord<FieldSet>) => ({
      id: record.id,
      createdAt: record.get('createdAt') as string,
      fields: record.fields, // Spread fields directly at root level
    }))

    logger.info(`Updated ${formattedRecords.length} records in ${tableName}`)
    return formattedRecords
  } catch (error) {
    console.error('airtableUpdate error:', error)
    handleAirtableError(error, 'UPDATE', tableName)
    // The above function always throws, but to satisfy TypeScript, return an empty array here.
    return []
  }
}

export const airtableDelete = async (
  tableName: string,
  recordIds: string[]
): Promise<{ deletedRecords: string[] }> => {
  try {
    if (!recordIds.length) {
      throw new Error('No record IDs provided')
    }

    logger.info(`Deleting ${recordIds.length} records from ${tableName}`)

    const deletedRecords = await base(tableName).destroy(recordIds)
    const deletedIds = deletedRecords.map(record => record.id)

    logger.warn(`Deleted ${deletedIds.length} records from ${tableName}`, { deletedIds })
    return { deletedRecords: deletedIds }
  } catch (error) {
    handleAirtableError(error, 'DELETE', tableName)
    // The above function always throws, but to satisfy TypeScript, return an empty object here.
    return { deletedRecords: [] }
  }
}