import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (dateString?: string) => {
  if (!dateString) return ""
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

export const formatDate = (dateString?: string) => {
  if (!dateString) return ""
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

export const getTimeRange = (dateStart?: string, dateEnd?: string) => {
  if (!dateStart && !dateEnd) return ""

  const startTime = formatTime(dateStart)
  const endTime = formatTime(dateEnd)

  if (startTime && endTime) {
    return `${startTime} => ${endTime}`
  } else if (startTime) {
    return `À partir de ${startTime}`
  } else if (endTime) {
    return `Jusqu'à ${endTime}`
  }

  return ""
}
