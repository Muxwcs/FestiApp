import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { Role } from "./generated/prisma/enums"

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = (credentials.email as string).toLowerCase().trim()
        const password = credentials.password as string

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            referentSectors: { select: { sectorId: true } },
          },
        })

        // Generic failure — don't reveal if user exists or not
        if (!user || !user.isActive) {
          logger.warn("Login failed: user not found or inactive", { email })
          return null
        }

        // Check account lockout
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const minutesLeft = Math.ceil(
            (user.lockedUntil.getTime() - Date.now()) / 60000
          )
          logger.warn("Login blocked: account locked", {
            email,
            minutesLeft,
          })
          return null
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          // Increment failed attempts
          const attempts = user.failedLoginAttempts + 1
          const lockout = attempts >= MAX_LOGIN_ATTEMPTS
            ? new Date(Date.now() + LOCKOUT_DURATION_MS)
            : null

          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: attempts,
              lockedUntil: lockout,
            },
          })

          if (lockout) {
            logger.warn("Account locked after max attempts", {
              email,
              attempts,
            })
          } else {
            logger.warn("Login failed: bad password", {
              email,
              attempts,
              remaining: MAX_LOGIN_ATTEMPTS - attempts,
            })
          }

          return null
        }

        // Success — reset failed attempts, record login
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        })

        logger.info("Login successful", { email, userId: user.id })

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.firstname,
          role: user.role,
          isReferent: user.isReferent || user.referentSectors.length > 0,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role as Role
        token.isReferent = user.isReferent as boolean
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.isReferent = token.isReferent as boolean
      }
      return session
    },
  },
})
