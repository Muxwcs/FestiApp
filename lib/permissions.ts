import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Role } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"

type AllowedRoles = Role[]

export const checkPermission = async (allowedRoles: AllowedRoles) => {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userRole = session.user.role as Role

  if (!allowedRoles.includes(userRole)) {
    redirect("/dashboard?error=unauthorized")
  }

  return session
}

export const isAdmin = async () => {
  return checkPermission(["ADMIN"])
}

export const isAdminOrReferent = async () => {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN" && !session.user.isReferent) {
    redirect("/dashboard?error=unauthorized")
  }

  return session
}

// ─── Accès secteur ─────────────────────────────────────────────

export type SectorAccessLevel = "admin" | "sector_referent" | "timeslot_referent"

/**
 * Détermine le niveau d'accès d'un utilisateur à un secteur.
 * Nécessite un userId déjà vérifié (pas d'appel auth() interne).
 */
export const getSectorAccessLevel = async (
  userId: string,
  userRole: string,
  sectorId: string
): Promise<SectorAccessLevel | null> => {
  if (userRole === "ADMIN") return "admin"

  const sectorRef = await prisma.sectorReferent.findUnique({
    where: { userId_sectorId: { userId, sectorId } },
  })

  if (sectorRef) return "sector_referent"

  const timeslotRef = await prisma.timeslotReferent.findFirst({
    where: { userId, timeslot: { sectorId } },
  })

  return timeslotRef ? "timeslot_referent" : null
}

/**
 * Vérifie l'accès au secteur et redirige si non autorisé.
 * Retourne la session + le niveau d'accès.
 */
export const checkSectorAccess = async (sectorId: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const accessLevel = await getSectorAccessLevel(
    session.user.id,
    session.user.role as string,
    sectorId
  )

  if (!accessLevel) {
    redirect("/referent?error=unauthorized")
  }

  return { session, accessLevel }
}

/**
 * Récupère les infos de l'utilisateur courant
 */
export const getCurrentUser = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    firstname: session.user.firstname ?? null,
    surname: session.user.surname ?? null,
    role: session.user.role as Role,
    isAdmin: session.user.role === "ADMIN",
    isReferent: session.user.isReferent,
    isAdminOrReferent: session.user.role === "ADMIN" || session.user.isReferent,
  }
}