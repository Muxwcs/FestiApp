import Airtable from "airtable"

type AirtableRecord = {
  id: string
  get(field: string): unknown
}

export const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!)

export async function getUserByFirebaseUid(uid: string) {
  const records = await base("Membres")
    .select({
      filterByFormula: `{firebaseUid} = '${uid}'`,
      maxRecords: 1,
    })
    .firstPage()

  if (records.length === 0) return null

  const record: AirtableRecord = records[0]
  return {
    id: record.id,
    email: record.get("email") ? String(record.get("email")) : undefined,
    phone: record.get("phone") ? String(record.get("phone")) : undefined,
    name: record.get("name") ? String(record.get("name")) : undefined,
    surname: record.get("surname") ? String(record.get("surname")) : undefined,
    role: record.get("role") ? String(record.get("role")).toLowerCase() : "bénévole", // Default to "benevole" if not set
    availability: record.get("availability"),
    assignedTasks: record.get("assignedTasks"),
    status: record.get("status"),
    skills: record.get("skills") ? record.get("skills") : [],
    avatar: record.get("avatar"),
    notes: record.get("notes") ? String(record.get("notes")) : undefined,
    createdAt: record.get("createdAt"),
    modifiedAt: record.get("modifiedAt"),
  }
}

export async function createUserInAirtable({ uid, email }: { uid: string, email: string }) {
  const created = await base("Membres").create([
    {
      fields: {
        firebaseUid: uid,
        email,
        role: "Bénévole", // default role
      },
    },
  ])
  const record = created[0]
  return {
    id: record.id,
    email: record.get("email") ? String(record.get("email")) : undefined,
    phone: record.get("phone") ? String(record.get("phone")) : undefined,
    name: record.get("name") ? String(record.get("name")) : undefined,
    surname: record.get("surname") ? String(record.get("surname")) : undefined,
    role: record.get("role") ? String(record.get("role")).toLowerCase() : "bénévole",
    availability: record.get("availability") || null,
    assignedTasks: record.get("assignedTasks") || [],
    status: record.get("status") || null,
    skills: record.get("skills") || [],
    avatar: record.get("avatar") || null,
    notes: record.get("notes") ? String(record.get("notes")) : undefined,
    createdAt: record.get("createdAt") || null,
    modifiedAt: record.get("modifiedAt") || null,
  }
}
