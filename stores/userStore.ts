// import { User, VolunteerRecord } from "@/types/user.interface"
// import { create } from "zustand"
// import { persist, devtools } from "zustand/middleware"

// type UserState = {
//   role: string | null
//   user: VolunteerRecord | null
//   setRole: (role: string) => void
//   setUser: (user: VolunteerRecord | null) => void
// }

// export const useUserStore = create<UserState>()(
//   devtools(
//     persist(
//       (set) => ({
//         role: null,
//         user: null,
//         setUser: (user) => set({ user }),
//         setRole: (role) => set({ role }),
//       }),
//       {
//         name: "user-store", // key in localStorage
//         partialize: (state) => ({ user: state.user }), // Don't persist role in localStorage (tamperable)
//       }
//     ),
//     {
//       name: "UserStore",
//       enabled: process.env.NODE_ENV === 'development', // Only in development 
//     }
//   )
// )

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Role } from "@/generated_old/prisma/client"

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
