"use client"

import { Card, CardContent } from "@/components/ui/card"

// ✅ Stats Card Component
interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description?: string
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  trend?: number // percentage change
}

const StatsCard = ({ title, value, icon, description, variant = 'default', trend }: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950'
      case 'destructive':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return 'text-green-700 dark:text-green-300'
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300'
      case 'destructive':
        return 'text-red-700 dark:text-red-300'
      default:
        return 'text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <Card className={`${getVariantStyles()} transition-all hover:shadow-md`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row  items-center sm:space-x-3">
            <div className={`p-2 rounded-lg ${getTextColor()}`}>
              {icon}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl sm:text-3xl font-bold">{value.toLocaleString()}</p>
                {trend !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded-full ${trend > 0
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : trend < 0
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                    {trend > 0 ? '+' : ''}{trend}%
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-center sm:text-left text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard