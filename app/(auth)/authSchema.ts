import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email requis")
    .email("Email invalide")
    .max(255, "Email trop long"),
  password: z
    .string()
    .min(1, "Mot de passe requis")
    .max(128, "Mot de passe trop long"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
