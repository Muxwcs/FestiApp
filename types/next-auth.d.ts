import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null
      name?: string | null
      email?: string | null
      role: string
      airtableId?: string | null,
      isReferent: boolean
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    role: string
    isReferent: boolean // ✅ Add to user type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    isReferent: boolean // ✅ Add to JWT type
  }
}
