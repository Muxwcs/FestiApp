import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routing } from "@/lib/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Auth check for protected routes (no i18n on these)
  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/referent")

  const isAuthPath = pathname.startsWith("/login")

  if (isProtectedPath || isAuthPath) {
    const sessionToken =
      request.cookies.get("authjs.session-token")?.value ||
      request.cookies.get("__Secure-authjs.session-token")?.value
    const isLoggedIn = !!sessionToken

    if (isProtectedPath && !isLoggedIn) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (isAuthPath && isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Security headers for protected routes
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    return response
  }

  // i18n routing for public pages (/, /fr, /eu, /en, /fr/..., etc.)
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Public pages (i18n)
    "/",
    "/(fr|eu|en)/:path*",
    // Protected pages (auth)
    "/dashboard/:path*",
    "/admin/:path*",
    "/referent/:path*",
    "/login",
  ],
}
