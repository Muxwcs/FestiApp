import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const { pathname } = req.nextUrl

  // Public route
  if (
    pathname === "/login" ||
    pathname.startsWith("/api") ||
    pathname === "/"
  ) {
    return NextResponse.next()
  }

  // Not authenticated → redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Admin-only access for /admin and its subroutes
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // All authenticated users (admin or benevole) can access /
  // No further checks needed for "/"

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // "/dashboard/:path*" covers benevole home, "/admin/*" covers admin and subroutes
}