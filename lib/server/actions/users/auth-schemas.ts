import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    country: z.string().min(2),
    primaryLanguage: z.string().min(2),
    secondaryLanguage: z.string().min(2).optional(),
  });

  export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });