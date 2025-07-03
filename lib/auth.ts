import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByFirebaseUid } from "./firebase-airtable"
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
        const user = await getUserByFirebaseUid(firebaseUid)
        if (!user) return null

        return {
          // id: firebaseUid,
          // email: user.email,
          // name: user.name,
          // role: user.role,
          id: String(firebaseUid),
          email: user.email ? String(user.email) : undefined,
          name: user.name ? String(user.name) : undefined,
          role: user.role ? String(user.role) : undefined,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}
