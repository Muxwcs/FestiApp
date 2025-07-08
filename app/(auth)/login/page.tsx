"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LoginForm } from "../LoginForm"
import { SignUpForm } from "../SignUpForm"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted">
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
  )
}