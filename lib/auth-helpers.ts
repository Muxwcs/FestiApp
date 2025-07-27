import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { createSecureHeaders, logSecurityEvent } from "./security"

export async function requireAuth(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) {
    logSecurityEvent('Unauthorized access attempt', { path: req.nextUrl.pathname }, req)
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: createSecureHeaders() }
      )
    }
  }
  return { token }
}

export async function requireAdmin(req: NextRequest) {
  const { token, error } = await requireAuth(req)
  if (error) return { error }

  if (token.role !== "admin") {
    logSecurityEvent('Forbidden access attempt', {
      path: req.nextUrl.pathname,
      role: token.role
    }, req)
    return {
      error: NextResponse.json(
        { error: "Forbidden" },
        { status: 403, headers: createSecureHeaders() }
      )
    }
  }
  return { token }
}

// ✅ NEW: Require referent role
export async function requireReferent(req: NextRequest) {
  const { token, error } = await requireAuth(req)
  if (error) return { error }

  if (!token.isReferent) {
    logSecurityEvent('Forbidden access attempt - Not a referent', {
      path: req.nextUrl.pathname,
      role: token.role,
      isReferent: token.isReferent
    }, req)
    return {
      error: NextResponse.json(
        { error: "Forbidden - Referent access required" },
        { status: 403, headers: createSecureHeaders() }
      )
    }
  }
  return { token }
}

// ✅ NEW: Require admin OR referent
export async function requireAdminOrReferent(req: NextRequest) {
  const { token, error } = await requireAuth(req)
  if (error) return { error }

  if (token.role !== "admin" && !token.isReferent) {
    logSecurityEvent('Forbidden access attempt - Not admin or referent', {
      path: req.nextUrl.pathname,
      role: token.role,
      isReferent: token.isReferent
    }, req)
    return {
      error: NextResponse.json(
        { error: "Forbidden - Admin or Referent access required" },
        { status: 403, headers: createSecureHeaders() }
      )
    }
  }
  return { token }
}