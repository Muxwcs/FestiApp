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