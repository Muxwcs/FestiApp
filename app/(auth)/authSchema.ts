import { z } from "zod"

export const passwordRequirements =
  "Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."

// Schema for LOGIN (simpler validation)
export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
})

// Schema for REGISTRATION (complex validation)
export const registerSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(8, { message: passwordRequirements })
    .max(4096)
    .regex(/[A-Z]/, { message: "Au moins une majuscule requise" })
    .regex(/[a-z]/, { message: "Au moins une minuscule requise" })
    .regex(/[0-9]/, { message: "Au moins un chiffre requis" })
    .regex(/[^A-Za-z0-9]/, { message: "Au moins un caractère spécial requis" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>