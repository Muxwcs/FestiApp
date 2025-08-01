"use client"

import { useDrop } from "react-dnd"
import { parseISO } from "date-fns"

// import { useUpdateEvent } from "@/hooks/use-update-event"

import { cn } from "@/lib/utils"
import { ItemTypes } from "./draggable-event"

import { ICalendarCell, IEvent } from "../interfaces"

interface DroppableDayCellProps {
  cell: ICalendarCell
  children: React.ReactNode
}

export function DroppableDayCell({ cell, children }: DroppableDayCellProps) {
  // const { updateEvent } = useUpdateEvent()

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.EVENT,
      drop: (item: { event: IEvent }) => {
        const droppedEvent = item.event

        const eventStartDate = parseISO(droppedEvent.startDate)
        // const eventEndDate = parseISO(droppedEvent.endDate)

        // const eventDurationMs = differenceInMilliseconds(eventEndDate, eventStartDate)

        const newStartDate = new Date(cell.date)
        newStartDate.setHours(eventStartDate.getHours(), eventStartDate.getMinutes(), eventStartDate.getSeconds(), eventStartDate.getMilliseconds())
        // const newEndDate = new Date(newStartDate.getTime() + eventDurationMs)

        // updateEvent({
        //   ...droppedEvent,
        //   startDate: newStartDate.toISOString(),
        //   endDate: newEndDate.toISOString(),
        // })

        return { moved: true }
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [cell.date]
  )

  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>} className={cn(isOver && canDrop && "bg-accent/50")}>
      {children}
    </div>
  )
}