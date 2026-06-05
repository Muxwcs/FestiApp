import type { Role } from "@/generated/prisma/enums"
import { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
      isReferent: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role?: Role
    isReferent?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    isReferent: boolean
  }
}

