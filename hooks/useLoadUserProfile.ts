import { useQuery } from '@tanstack/react-query'
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useUserStore } from "@/stores/userStore"
import { logger } from "@/lib/logger"

// Fetch function for user profile
async function fetchUserProfile() {
  const response = await fetch("/api/me")
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.status}`)
  }
  return response.json()
}

export function useLoadUserProfile() {
  const { data: session, status } = useSession()
  const setUser = useUserStore((state) => state.setUser)

  // ✅ Use React Query for caching
  const { data: userData, error, isLoading } = useQuery({
    queryKey: ['user-profile', session?.user?.email],
    queryFn: fetchUserProfile,
    enabled: status === 'authenticated' && !!session?.user?.id,
    staleTime: 10 * 60 * 1000, // 10 minutes - profile doesn't change often
    gcTime: 30 * 60 * 1000,    // 30 minutes cache
    retry: 1,
  })

  // ✅ Update store when data changes
  useEffect(() => {
    if (userData) {
      logger.info(userData, 'data from hooks (cached)')
      setUser(userData)
    } else if (error) {
      setUser(null)
      logger.error("Failed to load user profile:", error)
    }
  }, [userData, error, setUser])

  return {
    userData,
    isLoading,
    error
  }
}