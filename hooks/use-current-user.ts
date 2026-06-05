import { useSession } from "next-auth/react"

export const useCurrentUser = () => {
  const { data: session, status } = useSession()

  const getCurrentUser = () => {
    if (session?.user) {
      return {
        role: session.user.role === "ADMIN" ? "admin" as const : "bénévole" as const,
        isReferent: !!session.user.isReferent,
        email: session.user.email,
        name: session.user.name,
        id: session.user.id,
        source: "nextauth" as const,
      }
    }

    // Default fallback (loading / not authenticated)
    return {
      role: "bénévole" as const,
      isReferent: false,
      email: null,
      name: null,
      id: null,
      source: "default" as const,
    }
  }

  return {
    user: getCurrentUser(),
    isLoading: status === "loading",
    isAuthenticated: !!session,
    session,
  }
}
