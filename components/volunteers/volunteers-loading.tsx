import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { User, RefreshCw } from "lucide-react"

interface VolunteersLoadingProps {
  sectorName?: string
}

const VolunteersLoading = ({ sectorName }: VolunteersLoadingProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl flex items-center">
          <User className="h-5 w-5 mr-2" />
          Bénévoles assignés
          {sectorName && <span className="text-sm font-normal ml-2">({sectorName})</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Chargement des bénévoles...</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default VolunteersLoading