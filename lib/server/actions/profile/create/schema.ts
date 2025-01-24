import { z, ZodTypeAny } from "zod";

export const ProfileZodSchema = z.object({
    username: z.string().min(4),
    imageUrl: z.string().optional(),
    country: z.string().optional(),
    language: z.string().optional(),
    isPublic: z.boolean(),
})
