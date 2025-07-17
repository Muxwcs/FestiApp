import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/components/calendar/interfaces"

interface EventCardProps {
  event: CalendarEvent
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <div className={`p-2 rounded text-sm ${className}`}>
      <div className="font-medium">{event.title}</div>

      {event.isVolunteerTimeslot && (
        <div className="mt-1 space-y-1">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {event.sectorName}
            </Badge>
            <Badge
              variant={event.status === 'Validé' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {event.status}
            </Badge>
          </div>

          {event.capacity && (
            <div className="text-xs text-muted-foreground">
              Équipe: {event.capacity}
            </div>
          )}

          {event.role && (
            <div className="text-xs text-muted-foreground">
              Rôle: {event.role}
            </div>
          )}
        </div>
      )}
    </div>
  )
}