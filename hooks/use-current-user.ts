import { useSession } from "next-auth/react"

export const useCurrentUser = () => {
  const { data: session, status } = useSession()

  const user = (() => {
    if (session?.user) {
      const role = session.user.role
      return {
        role:
          role === "ADMIN"
            ? ("admin" as const)
            : ("bénévole" as const),
        isReferent: !!session.user.isReferent,
        email: session.user.email ?? null,
        name: session.user.name ?? null,
        firstname: session.user.firstname ?? null,
        surname: session.user.surname ?? null,
        id: session.user.id ?? null,
      }
    }

    return {
      role: "bénévole" as const,
      isReferent: false,
      email: null,
      name: null,
      firstname: null,
      surname: null,
      id: null,
    }
  })()


  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
  }
}
