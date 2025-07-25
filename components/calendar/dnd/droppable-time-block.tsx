"use client"

import { useDrop } from "react-dnd"

import { cn } from "@/lib/utils"
import { ItemTypes } from "./draggable-event"

import { IEvent } from "../interfaces"

interface DroppableTimeBlockProps {
  date: Date
  hour: number
  minute: number
  children: React.ReactNode
}

export function DroppableTimeBlock({ date, hour, minute, children }: DroppableTimeBlockProps) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.EVENT,
      drop: (item: { event: IEvent }) => {
        const newStartDate = new Date(date)
        newStartDate.setHours(hour, minute, 0, 0)

        return { moved: true }
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [date, hour, minute]
  )

  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>} className={cn("h-[24px]", isOver && canDrop && "bg-accent/50")}>
      {children}
    </div>
  )
}