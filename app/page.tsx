"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { signIn } from "next-auth/react"
import { firebaseAuth } from "@/lib/firebase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"

const authSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "6 caractères minimum" }),
})
type AuthFormValues = z.infer<typeof authSchema>

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    mode: "onTouched",
  })

  async function onSubmit(data: AuthFormValues) {
    setLoading(true)
    try {
      let userCredential
      if (mode === "register") {
        userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
      } else {
        userCredential = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
      }
      const token = await userCredential.user.getIdToken()
      const result = await signIn("credentials", {
        token,
        redirect: true,
        callbackUrl: "/dashboard",
      })
      if (result?.error) {
        toast.error(result.error)
      }
      reset()
    } catch (err: unknown) {
      const error = err as Error
      toast.error(error.message || "Erreur d'authentification")
    } finally {
      setLoading(false)
    }
  }

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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {touchedFields.email && errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  autoComplete="current-password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {touchedFields.password && errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {touchedFields.email && errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  autoComplete="new-password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {touchedFields.password && errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Inscription..." : "S'inscrire"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}