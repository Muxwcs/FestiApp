import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import { VolunteerViewProps } from "./type"

export const VolunteersCardView = ({
  volunteers,
  timeslotGroups,
  selectedTimeslot,
  getDisplayName,
  timeslots,
  allTimeslotDetails,
}: VolunteerViewProps) => {

  // Use timeslots and allTimeslotDetails for enhanced display
  console.log('Available timeslots:', timeslots)
  console.log('Timeslot details:', allTimeslotDetails)
  const getFilteredVolunteers = () => {
    if (selectedTimeslot === "all") {
      return volunteers
    }

    const selectedGroup = timeslotGroups.find(group => group.timeslot === selectedTimeslot)
    return selectedGroup ? selectedGroup.volunteers : []
  }

  const filteredVolunteers = getFilteredVolunteers()

  if (volunteers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">Aucun bénévole assigné</p>
        <p className="text-sm">Ce secteur n&apos;a pas encore de bénévoles assignés.</p>
      </div>
    )
  }

  if (filteredVolunteers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">Aucun bénévole pour ce créneau</p>
        <p className="text-sm">Aucun bénévole n&apos;est assigné au créneau sélectionné.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Show current filter if not "all" */}
      {selectedTimeslot !== "all" && (
        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border">
          <Clock className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            Créneau : {selectedTimeslot}
          </span>
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
            {filteredVolunteers.length} bénévole{filteredVolunteers.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      )}

      {filteredVolunteers.map((volunteer) => (
        <div
          key={volunteer.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">
                  {getDisplayName(volunteer)}
                </h3>
                {volunteer.fields.role && (
                  <Badge variant={volunteer.fields.role === "admin" ? "destructive" : "secondary"}>
                    {volunteer.fields.role}
                  </Badge>
                )}
              </div>

              <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                {volunteer.fields.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="break-all">{volunteer.fields.email}</span>
                  </div>
                )}
                {volunteer.fields.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{volunteer.fields.phone}</span>
                  </div>
                )}
              </div>

              {/* Show timeslots for this volunteer */}
              {volunteer.affectations && volunteer.affectations.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {volunteer.affectations.map((aff, index) => {
                    const timeslotNames = aff.timeslotNames || []

                    return timeslotNames.map((timeslotName, timeslotIndex) => (
                      <Badge
                        key={`${index}-${timeslotIndex}`}
                        variant="outline"
                        className="text-xs"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {timeslotName}
                      </Badge>
                    ))
                  })}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Link href={`/admin/benevoles/${volunteer.id}`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Voir détails
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}