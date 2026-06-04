import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated_old/prisma/client"
import { hash } from "bcryptjs"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await hash("Admin@Festival2026!", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@festiapp.fr" },
    update: {},
    create: {
      email: "admin@festiapp.fr",
      password: adminPassword,
      name: "Admin",
      firstname: "Festival",
      role: "ADMIN",
      isReferent: false,
      isActive: true,
      status: "Actif",
    },
  })
  console.log(`  ✅ Admin: ${admin.email} (${admin.id})`)

  // Create sectors
  const sectors = await Promise.all([
    prisma.sector.upsert({
      where: { id: "seed-bar" },
      update: {},
      create: {
        id: "seed-bar",
        name: "Bar",
        description: "Gestion du bar et des boissons",
        color: "#EF9F27",
        status: "Actif",
        skills: ["bar", "service"],
      },
    }),
    prisma.sector.upsert({
      where: { id: "seed-accueil" },
      update: {},
      create: {
        id: "seed-accueil",
        name: "Accueil",
        description: "Accueil du public et billetterie",
        color: "#5DCAA5",
        status: "Actif",
        skills: ["accueil"],
      },
    }),
    prisma.sector.upsert({
      where: { id: "seed-technique" },
      update: {},
      create: {
        id: "seed-technique",
        name: "Technique",
        description: "Son, lumière et scène",
        color: "#7C6FEF",
        status: "Actif",
        skills: ["technique", "sono"],
      },
    }),
  ])
  console.log(`  ✅ Sectors: ${sectors.map((s) => s.name).join(", ")}`)

  // Create timeslots
  const friday = new Date("2026-07-10T18:00:00")
  const fridayEnd = new Date("2026-07-10T23:00:00")
  const saturday = new Date("2026-07-11T10:00:00")
  const saturdayEnd = new Date("2026-07-11T18:00:00")

  const timeslots = await Promise.all([
    prisma.timeslot.create({
      data: { name: "Vendredi soir - Bar", dateStart: friday, dateEnd: fridayEnd, totalVolunteers: 4, sectorId: "seed-bar" },
    }),
    prisma.timeslot.create({
      data: { name: "Vendredi soir - Accueil", dateStart: friday, dateEnd: fridayEnd, totalVolunteers: 3, sectorId: "seed-accueil" },
    }),
    prisma.timeslot.create({
      data: { name: "Samedi journée - Bar", dateStart: saturday, dateEnd: saturdayEnd, totalVolunteers: 5, sectorId: "seed-bar" },
    }),
    prisma.timeslot.create({
      data: { name: "Samedi journée - Technique", dateStart: saturday, dateEnd: saturdayEnd, totalVolunteers: 2, sectorId: "seed-technique" },
    }),
  ])
  console.log(`  ✅ Timeslots: ${timeslots.length} created`)

  // Create test volunteers
  const volPassword = await hash("Benevole@2026!", 12)
  const volunteers = await Promise.all([
    prisma.user.upsert({
      where: { email: "marie.dupont@email.fr" },
      update: {},
      create: {
        email: "marie.dupont@email.fr",
        password: volPassword,
        name: "Dupont",
        firstname: "Marie",
        role: "BENEVOLE",
        isActive: true,
        status: "Actif",
        skills: ["bar", "accueil"],
        availability: ["vendredi", "samedi"],
      },
    }),
    prisma.user.upsert({
      where: { email: "jean.martin@email.fr" },
      update: {},
      create: {
        email: "jean.martin@email.fr",
        password: volPassword,
        name: "Martin",
        firstname: "Jean",
        role: "BENEVOLE",
        isReferent: true,
        isActive: true,
        status: "Actif",
        skills: ["technique", "sono"],
        availability: ["samedi", "dimanche"],
      },
    }),
  ])
  console.log(`  ✅ Volunteers: ${volunteers.map((v) => v.email).join(", ")}`)

  // Make Jean referent of Technique
  await prisma.sectorReferent.upsert({
    where: {
      userId_sectorId: {
        userId: volunteers[1].id,
        sectorId: "seed-technique",
      },
    },
    update: {},
    create: {
      userId: volunteers[1].id,
      sectorId: "seed-technique",
    },
  })
  console.log("  ✅ Jean Martin → référent Technique")

  console.log("\n🎉 Seed complete!")
  console.log("\n📋 Comptes de test :")
  console.log("  Admin:     admin@festiapp.fr / Admin@Festival2026!")
  console.log("  Bénévole:  marie.dupont@email.fr / Benevole@2026!")
  console.log("  Référent:  jean.martin@email.fr / Benevole@2026!")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
