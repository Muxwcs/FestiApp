import { logger } from "./logger"

// --- Input sanitization ---

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 255
}

export function validateInput(input: unknown): string | null {
  if (typeof input !== "string") return null
  if (input.length > 1000) return null
  if (input.includes("\0")) return null
  return sanitizeInput(input)
}

// --- ID validation (CUID format used by Prisma) ---

const CUID_REGEX = /^c[a-z0-9]{20,30}$/

export function validateId(id: unknown): string {
  if (typeof id !== "string" || !CUID_REGEX.test(id)) {
    throw new Error("Format d'identifiant invalide")
  }
  return id
}

export function validateIds(ids: unknown): string[] {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Liste d'identifiants invalide")
  }
  if (ids.length > 100) {
    throw new Error("Trop d'identifiants (max 100)")
  }
  return ids.map((id) => validateId(id))
}

// --- Security headers ---

export function createSecureHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  }
}

// --- Security event logging ---

export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>,
  headers?: Headers
) {
  const ip = headers
    ? headers.get("x-forwarded-for") ||
    headers.get("x-real-ip") ||
    "unknown"
    : "unknown"

  logger.warn(`[SECURITY] ${event}`, { ip, ...details })
}
