import { volunteers, base } from "./airtable"

export async function getUserByFirebaseUid(uid: string) {
  try {
    const record = await volunteers.getByFirebaseUid(uid)
    if (!record) return null

    return {
      id: record.id,
      email: record.fields.email ? String(record.fields.email) : undefined,
      phone: record.fields.phone ? String(record.fields.phone) : undefined,
      name: record.fields.name ? String(record.fields.name) : undefined,
      surname: record.fields.surname ? String(record.fields.surname) : undefined,
      role: record.fields.role ? String(record.fields.role).toLowerCase() : "bénévole", // Default to "benevole" if not set
      availability: record.fields.availability,
      assignedTasks: record.fields.assignedTasks,
      assignedTxands: record.fields.assignedTxands,
      referent: record.fields.referent || [],
      status: record.fields.status,
      skills: record.fields.skills ? record.fields.skills : [],
      avatar: record.fields.avatar,
      notes: record.fields.notes ? String(record.fields.notes) : undefined,
      createdAt: record.fields.createdAt,
      modifiedAt: record.fields.modifiedAt,
    }

  } catch (error) {
    console.error('Error fetching user by Firebase UID:', error)
    return null
  }
}

export async function createUserInAirtable({ uid, email }: { uid: string, email: string }) {
  try {

    const created = await volunteers.createOne(
      {
        fields: {
          firebaseUid: uid,
          email,
          role: "Bénévole", // default role
        },
      },
    )
    if (!created) {
      throw new Error("Failed to create user in Airtable")
    }
    return {
      id: created.id,
      email: created.fields.email ? String(created.fields.email) : undefined,
      phone: created.fields.phone ? String(created.fields.phone) : undefined,
      name: created.fields.name ? String(created.fields.name) : undefined,
      surname: created.fields.surname ? String(created.fields.surname) : undefined,
      role: created.fields.role ? String(created.fields.role).toLowerCase() : "bénévole",
      availability: created.fields.availability || null,
      assignedTasks: created.fields.assignedTasks || [],
      assignedTxands: created.fields.assignedTxands || [],
      referent: created.fields.referent || [],
      status: created.fields.status || null,
      skills: created.fields.skills || [],
      avatar: created.fields.avatar || null,
      notes: created.fields.notes ? String(created.fields.notes) : undefined,
      createdAt: created.fields.createdAt || null,
      modifiedAt: created.fields.modifiedAt || null,
    }
  } catch (error) {
    console.error('Error creating user in Airtable:', error)
    throw error
  }
}

export { base }
