// import { getToken } from "next-auth/jwt"
// import { NextRequest, NextResponse } from "next/server"
// import { createSecureHeaders, logSecurityEvent } from "./security"

// export async function requireAuth(req: NextRequest) {
//   const token = await getToken({ req })
//   if (!token) {
//     logSecurityEvent('Unauthorized access attempt', { path: req.nextUrl.pathname }, req)
//     return {
//       error: NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401, headers: createSecureHeaders() }
//       )
//     }
//   }
//   return { token }
// }

// export async function requireAdmin(req: NextRequest) {
//   const { token, error } = await requireAuth(req)
//   if (error) return { error }

//   if (token.role !== "admin") {
//     logSecurityEvent('Forbidden access attempt', {
//       path: req.nextUrl.pathname,
//       role: token.role
//     }, req)
//     return {
//       error: NextResponse.json(
//         { error: "Forbidden" },
//         { status: 403, headers: createSecureHeaders() }
//       )
//     }
//   }
//   return { token }
// }

// // ✅ NEW: Require referent role
// export async function requireReferent(req: NextRequest) {
//   const { token, error } = await requireAuth(req)
//   if (error) return { error }

//   if (!token.isReferent) {
//     logSecurityEvent('Forbidden access attempt - Not a referent', {
//       path: req.nextUrl.pathname,
//       role: token.role,
//       isReferent: token.isReferent
//     }, req)
//     return {
//       error: NextResponse.json(
//         { error: "Forbidden - Referent access required" },
//         { status: 403, headers: createSecureHeaders() }
//       )
//     }
//   }
//   return { token }
// }

// // ✅ NEW: Require admin OR referent
// export async function requireAdminOrReferent(req: NextRequest) {
//   const { token, error } = await requireAuth(req)
//   if (error) return { error }

//   if (token.role !== "admin" && !token.isReferent) {
//     logSecurityEvent('Forbidden access attempt - Not admin or referent', {
//       path: req.nextUrl.pathname,
//       role: token.role,
//       isReferent: token.isReferent
//     }, req)
//     return {
//       error: NextResponse.json(
//         { error: "Forbidden - Admin or Referent access required" },
//         { status: 403, headers: createSecureHeaders() }
//       )
//     }
//   }
//   return { token }
// }

import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createSecureHeaders } from "./security"
import type { Session } from "next-auth"

type AuthResult =
  | { session: Session; error?: never }
  | { session?: never; error: NextResponse }

/**
 * Require authenticated user. Returns verified session or 401.
 */
export async function requireAuth(): Promise<AuthResult> {
  const session = await auth()

  if (!session?.user) {
    return {
      error: NextResponse.json(
        { error: "Non autorisé" },
        { status: 401, headers: createSecureHeaders() }
      ),
    }
  }

  return { session }
}

/**
 * Require ADMIN role. Returns verified session or 403.
 */
export async function requireAdmin(): Promise<AuthResult> {
  const result = await requireAuth()
  if (result.error) return result

  if (result.session.user.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Accès interdit" },
        { status: 403, headers: createSecureHeaders() }
      ),
    }
  }

  return result
}

/**
 * Require referent access. Returns verified session or 403.
 */
export async function requireReferent(): Promise<AuthResult> {
  const result = await requireAuth()
  if (result.error) return result

  if (!result.session.user.isReferent && result.session.user.role !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Accès réservé aux référents" },
        { status: 403, headers: createSecureHeaders() }
      ),
    }
  }

  return result
}

/**
 * Require ADMIN or referent. Returns verified session or 403.
 */
export async function requireAdminOrReferent(): Promise<AuthResult> {
  const result = await requireAuth()
  if (result.error) return result

  const { user } = result.session
  if (user.role !== "ADMIN" && !user.isReferent) {
    return {
      error: NextResponse.json(
        { error: "Accès réservé aux administrateurs et référents" },
        { status: 403, headers: createSecureHeaders() }
      ),
    }
  }

  return result
}
