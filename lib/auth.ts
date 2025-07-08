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
        return {
          id: firebaseUid,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}
