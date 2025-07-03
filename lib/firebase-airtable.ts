import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);

export async function getUserByFirebaseUid(uid: string) {
  const records = await base("Utilisateurs")
    .select({
      filterByFormula: `{firebaseUid} = '${uid}'`,
      maxRecords: 1,
    })
    .firstPage();

  if (records.length === 0) return null;

  const record = records[0];
  return {
    id: record.id,
    email: record.get("Email"),
    name: record.get("Nom complet"),
    role: record.get("Rôle"),
    airtableId: record.id,
  };
}
