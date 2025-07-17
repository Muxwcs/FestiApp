import { useState, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
import { CalendarEvent } from "@/components/calendar/interfaces"

interface VolunteerTimeslot {
  id: string
  name: string
  dateStart: string
  dateEnd: string
  sectorName: string
  status: "Validé" | "En attente" | "Refusé" | "Annulé"
  role?: string
  totalVolunteers?: number
  currentVolunteers?: number
}

export function useVolunteerCalendar() {
  const { data: session } = useSession()
  const [volunteerTimeslots, setVolunteerTimeslots] = useState<VolunteerTimeslot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVolunteerTimeslots = async () => {
    if (!session?.user?.email) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/volunteers/my-timeslots')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setVolunteerTimeslots(data.timeslots || [])
    } catch (err) {
      console.error('Error fetching volunteer timeslots:', err)
      setError('Erreur lors du chargement de vos créneaux')
      setVolunteerTimeslots([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user?.email) {
      fetchVolunteerTimeslots()
    }
  }, [session?.user?.email])

  // Convert volunteer timeslots to calendar events
  const volunteerEvents: CalendarEvent[] = useMemo(() => {
    if (!session?.user) return []

    return volunteerTimeslots.map(timeslot => ({
      id: `volunteer-${timeslot.id}`,
      title: timeslot.name,
      description: `Secteur: ${timeslot.sectorName}\nStatut: ${timeslot.status}${timeslot.role ? `\nRôle: ${timeslot.role}` : ''}`,
      startDate: timeslot.dateStart,
      endDate: timeslot.dateEnd,
      user: {
        id: session.user.id || 'current-user',
        name: session.user.name || 'Moi',
        email: session.user.email || '',
        avatar: (session.user as { image?: string })?.image || ''
      },
      color: getTimeslotColor(timeslot.status),
      variant: 'default' as const,
      isVolunteerTimeslot: true,
      sectorName: timeslot.sectorName,
      status: timeslot.status,
      role: timeslot.role,
      capacity: timeslot.totalVolunteers ? `${timeslot.currentVolunteers || 0}/${timeslot.totalVolunteers}` : undefined
    }))
  }, [volunteerTimeslots, session?.user])

  return {
    volunteerEvents,
    volunteerTimeslots,
    loading,
    error,
    refetch: fetchVolunteerTimeslots
  }
}

function getTimeslotColor(status: string): string {
  switch (status) {
    case 'Validé':
      return 'green'
    case 'En attente':
      return 'yellow'
    case 'Refusé':
      return 'red'
    case 'Annulé':
      return 'gray'
    default:
      return 'blue'
  }
}