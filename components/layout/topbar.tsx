"use client"

import { Bell, LogOut, User } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { DarkModeToggle } from "../darkmode-toggle"
import { signOut } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function Topbar() {
  const { user } = useCurrentUser()

  const initials = (() => {
    const f = user.firstname?.[0] ?? ""
    const s = user.surname?.[0] ?? ""
    if (f || s) return (f + s).toUpperCase()
    return user.email?.[0]?.toUpperCase() || "?"
  })()

  const displayName =
    [user.surname, user.firstname].filter(Boolean).join(" ") || "Utilisateur"


  const roleLabel = user.role === "admin" ? "Admin"
    : user.isReferent ? "Référent"
      : "Bénévole"

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <DarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {displayName}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <span className="inline-flex w-fit mt-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {roleLabel}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}