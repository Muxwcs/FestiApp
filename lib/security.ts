import { NextRequest } from 'next/server'
import { logger } from './logger'

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateInput(input: unknown): string | null {
  if (typeof input !== 'string') return null
  if (input.length > 1000) return null // Prevent extremely long inputs
  if (input.includes('\0')) return null // Prevent null byte injection
  return sanitizeInput(input)
}

export function createSecureHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
}

export function logSecurityEvent(event: string, details: Record<string, unknown>, req: NextRequest) {
  // const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const ip = req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-client-ip') ||
    'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'

  logger.warn(`Security Event: ${event}`, {
    ip,
    userAgent,
    url: req.url,
    details
  })
}