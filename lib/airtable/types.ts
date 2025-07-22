export type AirtableRecord = {
  id: string
  fields: Record<string, unknown>
  createdAt?: string
}

export type QueryOptions = {
  filterByFormula?: string
  maxRecords?: number
  pageSize?: number
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>
  view?: string
}

export type UpdateData = {
  id: string
  fields: Record<string, unknown>
}

export type CreateData = Record<string, unknown>