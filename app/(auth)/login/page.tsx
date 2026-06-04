"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "../LoginForm"
import HomeTopbar from "@/components/layout/home-topbar"

const AuthPage = () => {
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
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage