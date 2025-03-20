import { z, ZodTypeAny } from "zod";

export const ReviewZodSchema = z.object({
    contentId: z.string({
        required_error: "ID is required.",
        invalid_type_error: "ID be valid"
    }),
    userId: z.string({
        required_error: "User ID is required.",
        invalid_type_error: "User ID be valid"
    }),
    contentType: z.enum(["movie", "series", "book", "game"]),
    body: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }).min(10, "Review must be at least 10 characters long").max(2000, "Review must be at most 2000 characters long"),
    isAnnonymous: z.boolean(),
    isSpoiler: z.boolean(),
    rating: z.number().min(0, "Rating must be at least 0").max(10, "Rating cannot exceed 10")
})