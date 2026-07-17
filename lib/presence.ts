"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getSectorAccessLevel } from "@/lib/permissions"
import { Presence } from "@/generated/prisma/enums"
import { revalidatePath } from "next/cache"

/**
 * Vérifie que l'utilisateur a le droit de pointer sur un créneau donné
 */
const checkPresenceAccess = async (sectorId: string, timeslotId: string) => {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Non authentifié")

  const accessLevel = await getSectorAccessLevel(
    session.user.id,
    session.user.role as string,
    sectorId
  )

  if (!accessLevel) throw new Error("Accès refusé")

  if (accessLevel === "timeslot_referent") {
    const ref = await prisma.timeslotReferent.findUnique({
      where: {
        userId_timeslotId: {
          userId: session.user.id,
          timeslotId,
        },
      },
    })
    if (!ref) throw new Error("Accès refusé à ce créneau")
  }

  return session.user.id
}

/**
 * Marquer la présence d'un bénévole (unitaire)
 */
export const markPresence = async (
  affectationId: string,
  presence: Presence
) => {
  const affectation = await prisma.affectation.findUnique({
    where: { id: affectationId },
    select: { sectorId: true, timeslotId: true },
  })

  if (!affectation) throw new Error("Affectation introuvable")

  const userId = await checkPresenceAccess(affectation.sectorId, affectation.timeslotId)

  await prisma.affectation.update({
    where: { id: affectationId },
    data: {
      presence,
      checkedAt: new Date(),
      checkedBy: userId,
    },
  })

  revalidatePath("/referent")
}

/**
 * Marquer la présence en masse (tous les non-pointés d'un créneau)
 */
export const markBulkPresence = async (
  affectationIds: string[],
  presence: Presence
) => {
  if (affectationIds.length === 0) return

  const first = await prisma.affectation.findUnique({
    where: { id: affectationIds[0] },
    select: { sectorId: true, timeslotId: true },
  })

  if (!first) throw new Error("Affectation introuvable")

  const userId = await checkPresenceAccess(first.sectorId, first.timeslotId)

  await prisma.affectation.updateMany({
    where: { id: { in: affectationIds } },
    data: {
      presence,
      checkedAt: new Date(),
      checkedBy: userId,
    },
  })

  revalidatePath("/referent")
}