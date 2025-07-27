import { useQuery } from '@tanstack/react-query'
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useUserStore } from "@/stores/userStore"
import { logger } from "@/lib/logger"

export function useLoadUserProfile() {
  const { data: session, status } = useSession()
  const setUser = useUserStore((state) => state.setUser)

  const { data: userData, error, isLoading, isError } = useQuery({
    queryKey: ['user-profile', session?.user?.id],
    queryFn: async () => {
      const response = await fetch("/api/me")
      if (!response.ok) throw new Error('Failed to fetch profile')
      return response.json()
    },
    enabled: status === 'authenticated' && !!session?.user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  useEffect(() => {
    if (userData) {
      logger.info(userData, 'data from hooks (cached)')
      setUser(userData)
    } else if (isError) {
      setUser(null)
      logger.error("Failed to load user profile:", error)
    }
  }, [userData, setUser, error])

  return {
    userData,
    isLoading,
    error,
    // ✅ Easy access to computed values
    isReferent: userData?.isReferent || false,
    isAdmin: userData?.computed?.hasAdminRole || false,
    referentCount: userData?.computed?.referentCount || 0,
  }
}