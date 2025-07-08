import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function requireAuth(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  return { token }
}

export async function requireAdmin(req: NextRequest) {
  const { token, error } = await requireAuth(req)
  if (error) return { error }

  if (token.role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) }
  }
  return { token }
}