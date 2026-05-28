import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Rate limiting: disabled — in-memory Map does not persist across
  // Vercel serverless invocations. Will be replaced with Upstash Redis.
  // See Phase 3 of the migration plan.

  // Protected routes
  const protectedPaths = ['/dashboard', '/admin', '/referent']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Admin-only routes
    if (request.nextUrl.pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Referent routes - allow both referents AND admins
    if (request.nextUrl.pathname.startsWith('/referent')) {
      const isAdmin = token.role === 'admin'
      const isReferent = token.isReferent

      // Block only if user is NEITHER admin NOR referent
      if (!isAdmin && !isReferent) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}