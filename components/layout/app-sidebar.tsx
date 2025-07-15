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
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  role: "admin" | "bénévole"
  className?: string
}

const AppSidebar = ({ role, className }: SidebarProps) => {
  const pathname = usePathname() // Get current path
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

  // Admins get all routes: common + benevole + admin
  // Bénévoles get: common + benevole only
  const navLinks = role === "admin"
    ? [...commonLinks, ...benevoleLinks, ...adminLinks]
    : [...commonLinks, ...benevoleLinks]

  // Function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

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
              {/* {navLinks.map(({ href, label, icon: Icon }) => (
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
              ))} */}

              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = isActive(href)

                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={href}
                        className={cn(
                          // Base styles
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 relative group",
                          // Inactive styles
                          "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                          // Active styles - modern gradient with glow effect
                          active && [
                            "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground",
                            "shadow-lg shadow-primary/25",
                            "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
                            "hover:before:opacity-100",
                            "hover:shadow-xl hover:shadow-primary/30",
                            "hover:scale-[1.02]"
                          ]
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5 transition-all duration-200",
                          active && "drop-shadow-sm"
                        )} />
                        <span className={cn(
                          "transition-all duration-200",
                          active && "font-semibold"
                        )}>
                          {label}
                        </span>

                        {/* Modern active indicator */}
                        {active && (
                          <div className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
