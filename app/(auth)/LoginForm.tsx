"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormValues } from "./authSchema"
import { signInWithEmailAndPassword } from "firebase/auth"
import { signIn } from "next-auth/react"
import { firebaseAuth } from "@/lib/firebase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { validateInput, validateEmail } from "@/lib/security"

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

  async function onSubmit(data: LoginFormValues) {
    // Validate and sanitize inputs
    const email = validateInput(data.email)
    const password = validateInput(data.password)

    if (!email || !password) {
      toast.error("Invalid input data")
      return
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format")
      return
    }
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
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
      toast.error("Erreur de connexion")
      console.error("Login error:", error.message) // Don't expose full error to user
    } finally {
      setLoading(false)
    }
  }

  return (
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
  )
}