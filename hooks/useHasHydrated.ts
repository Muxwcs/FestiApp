import { useEffect, useState } from "react"

// This hook checks if the component has hydrated on the client side
// It can be used to avoid rendering issues with server-side rendering (SSR) in Next.js
export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false)
  useEffect(() => {
    setHasHydrated(true)
  }, [])
  return hasHydrated
}