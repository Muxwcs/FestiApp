"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormValues, passwordRequirements } from "./authSchema"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { signIn } from "next-auth/react"
import { firebaseAuth } from "@/lib/firebase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"

export function SignUpForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  async function onSubmit(data: RegisterFormValues) {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
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
      toast.error(error.message || "Erreur d'inscription")
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
        autoComplete="new-password"
        {...register("password")}
        aria-invalid={!!errors.password}
      />
      {touchedFields.password && errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        autoComplete="new-password"
        {...register("confirmPassword")}
        aria-invalid={!!errors.confirmPassword}
      />
      {touchedFields.confirmPassword && errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
      )}

      <p className="text-xs text-muted-foreground">{passwordRequirements}</p>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </Button>
    </form>
  )
}