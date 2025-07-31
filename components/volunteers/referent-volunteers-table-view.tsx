import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Mail, Phone, ExternalLink, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { ReferentVolunteerViewProps } from "./type"
import { formatDate, getTimeRange } from "@/lib/utils"

export const ReferentVolunteersTableView = ({
  timeslotGroups,
  getDisplayName,
  // allTimeslots,
  // timeslotDetails
}: ReferentVolunteerViewProps) => {

  return (
    <div className="space-y-6">
      {timeslotGroups.map((group, key) => (
        <Card key={key} className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">

                <CardTitle className="text-base font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  {group.timeslot.name}
                  <p></p>
                </CardTitle>
                {/* Date and Time Information */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {group.timeslot.dateStart && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(group.timeslot.dateStart)}</span>
                    </div>
                  )}
                  {getTimeRange(group.timeslot.dateStart, group.timeslot.dateEnd) && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium text-primary">
                        {getTimeRange(group.timeslot.dateStart, group.timeslot.dateEnd)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Badge variant={group.count > 0 ? "default" : "secondary"} className="text-xs">
                {group.count} / {group.totalVolunteers} bénévole{group.count !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {group.volunteers.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun bénévole assigné à ce créneau</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Nom</TableHead>
                    <TableHead className="w-[80px]">Rôle</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-[120px]">Téléphone</TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.volunteers.map((volunteer, index) => {
                    // Get status from affectations for this specific timeslot
                    const relevantAffectations = volunteer.affectations?.filter(aff =>
                      aff.timeslotNames?.includes(group.timeslot.name)
                    ) || []
                    const status = relevantAffectations[0]?.fields?.status || "Non défini"

                    return (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {getDisplayName(volunteer)}
                        </TableCell>
                        <TableCell>
                          {volunteer.fields.role && (
                            <Badge
                              variant={volunteer.fields.role === "admin" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {volunteer.fields.role}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            {volunteer.fields.email && (
                              <>
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[200px]">{volunteer.fields.email}</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            {volunteer.fields.phone && (
                              <>
                                <Phone className="h-3 w-3" />
                                <span>{volunteer.fields.phone}</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={status === "Validé" ? "default" : status === "En attente" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Link href={`/admin/benevoles/${volunteer.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}