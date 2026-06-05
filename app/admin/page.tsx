import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Calendar, CheckCircle } from "lucide-react"

const AdminDashboardPage = async () => {
  const session = await isAdmin()

  const [volunteersCount, sectorsCount, timeslotsCount, affectationsCount] = await Promise.all([
    prisma.user.count({ where: { isActive: true, role: "BENEVOLE" } }),
    prisma.sector.count(),
    prisma.timeslot.count(),
    prisma.affectation.count({ where: { status: "VALIDE" } }),
  ])

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Administration</h1>
        <p className="text-muted-foreground">
          Bienvenue, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bénévoles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteersCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Secteurs</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sectorsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Créneaux</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeslotsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Affectations validées</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affectationsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboardPage
