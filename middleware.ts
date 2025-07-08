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

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('x-client-ip') ||
      'unknown'

    // Simple rate limiting (you might want to use a more sophisticated solution)
    const rateLimit = await checkRateLimit(ip)
    if (!rateLimit.success) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  // Protected routes
  const protectedPaths = ['/dashboard', '/admin']
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
  }

  return response
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

async function checkRateLimit(ip: string): Promise<{ success: boolean }> {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  const current = rateLimit.get(ip)

  if (!current || now > current.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return { success: true }
  }

  if (current.count >= maxRequests) {
    return { success: false }
  }

  current.count++
  return { success: true }
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