import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useUserStore } from "@/stores/userStore"
import { logger } from "@/lib/logger"

export function useLoadUserProfile() {
  const { data: session } = useSession()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/me")
        .then((res) => res.json())
        .then((data) => {
          logger.info(data, 'data from hooks')
          setUser(data)
        }
        )
        .catch((err) => {
          setUser(null)
          logger.error("Failed to load user profile:", err)
        })
    }
  }, [session?.user?.id, setUser])
}