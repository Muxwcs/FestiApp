import { ReactNode } from "react"

export interface TimelineItem {
  number?: number
  // projectId: string[]
  comment?: string
  status: string
  // userId: string[]
  userName?: number[] | string[] | boolean[] | object[]
  userFirstname?: number[] | string[] | boolean[] | object[]
  createdAt?: string | Date | ReactNode
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