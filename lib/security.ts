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

// ✅ ADD NEW AIRTABLE-SPECIFIC SECURITY FUNCTIONS
export function validateAirtableId(id: string): boolean {
  return /^rec[a-zA-Z0-9]{14}$/.test(id)
}

export function sanitizeAirtableFilter(input: string): string {
  // Remove potentially dangerous characters for Airtable formulas
  return input
    .replace(/'/g, "\\'")           // Escape single quotes
    .replace(/[^\w\-@.]/g, '')      // Allow only safe characters
    .slice(0, 100)                  // Limit length
}

export function validateAndSanitizeId(id: unknown): string {
  if (typeof id !== 'string') {
    throw new Error('ID must be a string')
  }

  if (!validateAirtableId(id)) {
    throw new Error('Invalid Airtable record ID format')
  }

  return id
}

// ✅ ENHANCED VALIDATION FOR API PARAMETERS
export function validateRouteParam(param: string | string[] | undefined): string {
  if (!param || Array.isArray(param)) {
    throw new Error('Invalid route parameter')
  }

  return validateAndSanitizeId(param)
}

// ✅ BULK ID VALIDATION
export function validateAirtableIds(ids: string[]): string[] {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('IDs must be a non-empty array')
  }

  if (ids.length > 100) {
    throw new Error('Too many IDs requested (max 100)')
  }

  return ids.map(id => validateAndSanitizeId(id))
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

// lib/security.ts - ADD THIS FUNCTION
export function validateQueryParams(params: Record<string, string>): void {
  const { page, limit, search, status, sortBy, sortOrder } = params

  // Validate numeric parameters
  if (page && !/^\d+$/.test(page)) {
    throw new Error(`Invalid page parameter: ${page}`)
  }

  if (limit && !/^\d+$/.test(limit)) {
    throw new Error(`Invalid limit parameter: ${limit}`)
  }

  // Validate search string (if provided)
  if (search && search.length > 0) {
    if (search.length > 100) {
      throw new Error('Search term too long')
    }
    // Allow letters, numbers, spaces, basic punctuation
    if (!/^[a-zA-Z0-9\s\.\-_@]+$/.test(search)) {
      throw new Error('Invalid characters in search term')
    }
  }

  // Validate status enum
  const validStatuses = ['all', 'active', 'inactive', 'referent']
  if (status && !validStatuses.includes(status)) {
    throw new Error(`Invalid status parameter: ${status}`)
  }

  // Validate sortBy enum
  const validSortFields = ['name', 'email', 'created', 'status']
  if (sortBy && !validSortFields.includes(sortBy)) {
    throw new Error(`Invalid sortBy parameter: ${sortBy}`)
  }

  // Validate sortOrder enum
  const validSortOrders = ['asc', 'desc']
  if (sortOrder && !validSortOrders.includes(sortOrder)) {
    throw new Error(`Invalid sortOrder parameter: ${sortOrder}`)
  }
}