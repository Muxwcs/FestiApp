"use client"

import { LayoutDashboard, LogOut } from "lucide-react"
import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import Link from "next/link"
import { DarkModeToggle } from "../darkmode-toggle"
import { useUserStore } from "@/stores/userStore"

export default function HomeTopbar() {
  const user = useUserStore(state => state.user)
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
      <div className="flex items-center gap-4">
        <Image
          src="/icon-192x192.png"
          alt="Picture of the author"
          width={50}
          height={50}
        />
        <Link href={"/"} className="flex items-center gap-2">
          <h1 className="text-lg font-semibold tracking-tight">FestiApp</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Utilisateur" />
                <AvatarFallback>F</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user !== null ? (
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <Link href={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <Link href={"/login"}>Se Connecter</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}