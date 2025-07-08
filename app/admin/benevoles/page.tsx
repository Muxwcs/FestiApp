"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Volunteer = {
  id: string
  name: string
  email: string
  role: string
}

const Volunteers = () => {
  const { data: session } = useSession()
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/volunteers")
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue, {session?.user?.name} ({session?.user?.role})</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Liste des bénévoles</h2>
          {loading ? (
            <div>Chargement...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Nom</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map(v => (
                  <tr key={v.id}>
                    <td className="p-2">{v.name}</td>
                    <td className="p-2">{v.email}</td>
                    <td className="p-2">{v.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Volunteers