import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, RefreshCw } from "lucide-react"

interface VolunteersErrorProps {
  error: string
  onRetry: () => void
}

const VolunteersError = ({ error, onRetry }: VolunteersErrorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl flex items-center">
          <User className="h-5 w-5 mr-2" />
          Bénévoles assignés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VolunteersError