import { z, ZodTypeAny } from "zod";

export const ProfileZodSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    imageUrl: z.string().optional(),
    country: z.string().optional(),
    language: z.string().optional(),
    isPublic: z.boolean().optional(),
})
