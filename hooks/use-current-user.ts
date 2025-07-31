import { useSession } from "next-auth/react"
import { useUserStore } from "@/stores/userStore"

export const useCurrentUser = () => {
  const { data: session, status } = useSession()
  const { user: storeUser, role: storeRole } = useUserStore()

  // ✅ Prioritize NextAuth session over store
  const getCurrentUser = () => {
    if (session?.user) {
      return {
        role: session.user.role === 'admin' ? 'admin' as const : 'bénévole' as const,
        isReferent: !!session.user.isReferent,
        email: session.user.email,
        name: session.user.name,
        id: session.user.id,
        source: 'nextauth'
      }
    }

    // ✅ Fallback to store if no session
    if (storeUser?.fields) {
      return {
        role: (storeRole === 'admin' || storeUser.fields.role === 'admin') ? 'admin' as const : 'bénévole' as const,
        isReferent: !!storeUser.fields.isReferent,
        email: storeUser.fields.email,
        name: storeUser.fields.name,
        id: storeUser.id,
        source: 'store'
      }
    }

    // ✅ Default fallback
    return {
      role: 'bénévole' as const,
      isReferent: false,
      email: null,
      name: null,
      id: null,
      source: 'default'
    }
  }

  const currentUser = getCurrentUser()

  return {
    user: currentUser,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    session
  }
}