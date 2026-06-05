"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormValues } from "./authSchema"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  })

  async function onSubmit(data: LoginFormValues) {
    setLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email.toLowerCase().trim(),
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        // Generic message — don't reveal if email exists or password is wrong
        toast.error("Identifiants incorrects")
        return
      }

      window.location.href = "/dashboard"
    } catch {
      toast.error("Erreur de connexion. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Mot de passe"
          autoComplete="current-password"
          {...register("password")}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  )
}
