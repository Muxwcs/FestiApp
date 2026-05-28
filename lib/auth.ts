import { getUserByFirebaseUid, createUserInAirtable } from "./firebase-airtable"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyIdToken } from "./firebase-server"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        token: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null
        const decoded = await verifyIdToken(credentials.token)
        if (!decoded) return null

        const firebaseUid = decoded.uid
        let user = await getUserByFirebaseUid(firebaseUid)
        if (!user) {
          // Create user in Airtable if not found
          if (typeof decoded.email !== "string") return null
          user = await createUserInAirtable({ uid: firebaseUid, email: decoded.email })
        }
        if (!user) return null

        // ✅ ADD REFERENT LOGIC HERE
        const referentField = user.referent || []
        const isReferent = Array.isArray(referentField) ? referentField.length > 0 : false

        return {
          id: firebaseUid,
          airtableId: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isReferent,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.airtableId = user.airtableId // ✅ ADD: Store airtableId in token
        token.role = user.role
        token.isReferent = user.isReferent
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.airtableId = token.airtableId as string // ✅ ADD: Add airtableId to session
        session.user.role = token.role
        session.user.isReferent = token.isReferent // ✅ Available in session
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}
