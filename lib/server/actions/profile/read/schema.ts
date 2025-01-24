import { z, ZodTypeAny } from "zod";

export const ProfileZodSchema = z.object({
    id: z.string().optional(),
    userId: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }),
    imageUrl: z.string().optional(),
    country: z.string().optional(),
    language: z.string().optional(),
    isPublic: z.boolean().optional(),
})
