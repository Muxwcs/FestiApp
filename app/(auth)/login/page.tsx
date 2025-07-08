"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LoginForm } from "../LoginForm"
import { SignUpForm } from "../SignUpForm"
import HomeTopbar from "@/components/layout/home-topbar"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted">
      <HomeTopbar />
      <div className="flex flex-col w-full items-center justify-center mt-10">
        <Image
          src="/icon-192x192.png"
          alt="Logo FestiApp"
          width={200}
          height={200}
          className="mb-4"
        />
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connexion / Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={v => setMode(v as "login" | "register")}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}