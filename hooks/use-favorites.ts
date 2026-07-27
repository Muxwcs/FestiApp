"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "festiapp-favorites"
const SYNC_EVENT = "festiapp-favorites-sync"

function readFavorites(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(readFavorites())
    const handler = () => setFavorites(readFavorites())
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [])

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      window.dispatchEvent(new Event(SYNC_EVENT))
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  )

  return { favorites, toggle, isFavorite }
}