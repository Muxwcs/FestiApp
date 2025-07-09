import { Emojis, TimelineCategory, TimelineDay, TimelinePlace } from "@/lib/enums"
import { ReactNode } from "react"

export interface TimelineItem {
  category: TimelineCategory
  place: TimelinePlace
  emojis?: Emojis
  day: TimelineDay
  title: string
  number?: number
  comment: string
  hour: string | Date | ReactNode
  imageSrc: string
}
export interface GetTimeline {
  number: number
  projectId: string[]
  comment?: string
  status: string
  userId: string[]
  userName: number[] | string[] | boolean[] | object[]
  userFirstname: number[] | string[] | boolean[] | object[]
  createdAt: string
}