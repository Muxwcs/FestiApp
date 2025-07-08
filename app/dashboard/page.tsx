"use client"

import { useLoadUserProfile } from "@/hooks/useLoadUserProfile"
import { useUserStore } from "@/stores/userStore"
import { Suspense } from "react"

const Dashboard = () => {
  useLoadUserProfile()
  const user = useUserStore((state) => state.user)

  return (
    <>
      <div>Dashboard</div>
      <Suspense fallback={<div>Loading user data...</div>}>
        <h1>Bienvenue, {user?.name}</h1>
        {/* <h2>{data?.user.role}</h2> */}
        <p>Rôle: {user?.role}</p>
      </Suspense>
    </>
  )
}

export default Dashboard