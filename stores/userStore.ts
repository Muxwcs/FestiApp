import { Role } from "@/generated/prisma/enums"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface UserProfile {
  id: string
  email: string
  name: string | null
  firstname: string | null
  surname: string | null
  phone: string | null
  role: Role
  isReferent: boolean
  status: string | null
  avatar: string | null
  skills: string[]
  availability: string[]
}

type UserState = {
  user: UserProfile | null
  isLoading: boolean
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      clear: () => set({ user: null }),
    }),
    {
      name: "UserStore",
      enabled: process.env.NODE_ENV === "development",
    }
  )
)
