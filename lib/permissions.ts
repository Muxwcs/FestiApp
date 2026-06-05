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

/**
 * Vérifie si le référent a accès à un secteur spécifique
 */
export const canAccessSector = async (sectorId: string): Promise<boolean> => {
  const session = await auth()

  if (!session?.user?.id) {
    return false
  }

  // Admin a accès à tout
  if (session.user.role === "ADMIN") {
    return true
  }

  // Vérifier si référent du secteur
  const referent = await prisma.sectorReferent.findUnique({
    where: {
      userId_sectorId: {
        userId: session.user.id,
        sectorId,
      },
    },
  })

  return !!referent
}

export const checkSectorAccess = async (sectorId: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const hasAccess = await canAccessSector(sectorId)

  if (!hasAccess) {
    redirect("/referent?error=unauthorized")
  }

  return session
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
    role: session.user.role as Role,
    isAdmin: session.user.role === "ADMIN",
    isReferent: session.user.isReferent,
    isAdminOrReferent: session.user.role === "ADMIN" || session.user.isReferent,
  }
}
