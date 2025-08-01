import { cloneElement, Children, forwardRef, useMemo } from "react"

import { cn } from "@/lib/utils"

import type { HTMLAttributes, ReactElement } from "react"

// ================================== //

type TAvatarGroupRef = HTMLDivElement
type TAvatarGroupProps = HTMLAttributes<HTMLDivElement> & { max?: number; spacing?: number }

const AvatarGroup = forwardRef<TAvatarGroupRef, TAvatarGroupProps>(({ className, children, max = 1, spacing = 10, ...props }, ref) => {
  const avatarItems = Children.toArray(children) as ReactElement<{ className?: string; style?: React.CSSProperties }>[]

  const renderContent = useMemo(() => {
    return (
      <>
        {avatarItems.slice(0, max).map((child, index) => {
          return cloneElement(child, {
            className: cn((child.props as { className?: string }).className, "border-2 border-background"),
            style: { marginLeft: index === 0 ? 0 : -spacing, ...((child.props as { style?: React.CSSProperties }).style) },
          })
        })}

        {avatarItems.length > max && (
          <div
            className={cn("relative flex items-center justify-center rounded-full border-2 border-background bg-muted", (avatarItems[0].props as { className?: string }).className)}
            style={{ marginLeft: -spacing }}
          >
            <p>+{avatarItems.length - max}</p>
          </div>
        )}
      </>
    )
  }, [avatarItems, max, spacing])

  return (
    <div ref={ref} className={cn("relative flex", className)} {...props}>
      {renderContent}
    </div>
  )
})

AvatarGroup.displayName = "AvatarGroup"

// ================================== //

export { AvatarGroup }