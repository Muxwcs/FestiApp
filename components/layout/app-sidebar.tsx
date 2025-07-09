"use client"

import { cn } from "@/lib/utils"
import { Home, Users, LayoutDashboard } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

interface SidebarProps {
  role: "admin" | "bénévole"
  className?: string
}

const AppSidebar = ({ role, className }: SidebarProps) => {
  const commonLinks = [
    { href: "/", label: "Accueil", icon: Home },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard Admin", icon: LayoutDashboard },
    { href: "/admin/benevoles", label: "Gestion Bénévoles", icon: Users },
  ]

  const benevoleLinks = [
    { href: "/dashboard", label: "Mon Dashboard", icon: LayoutDashboard },
  ]

  const navLinks = [...commonLinks, ...(role === "admin" ? adminLinks : benevoleLinks)]

  return (
    <Sidebar className={className}>
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Image src="/icon-192x192.png" width={64} height={64} alt="FestiApp Logo" className="rounded-full" />
            <span className="text-3xl font-semibold">FestiApp</span>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <a
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
