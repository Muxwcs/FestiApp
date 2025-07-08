import { User } from "@/types/user.interface"
import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"

type UserState = {
  role: string | null
  user: User | null
  setRole: (role: string) => void
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        role: null,
        user: null,
        setUser: (user) => set({ user }),
        setRole: (role) => set({ role }),
      }),
      {
        name: "user-store", // key in localStorage
        partialize: (state) => ({ role: state.role, user: state.user }), // only persist these fields
      }
    ),
    { name: "UserStore" }
  )
)
