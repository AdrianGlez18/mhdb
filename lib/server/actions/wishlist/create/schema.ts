import { z } from "zod";

export const WishlistZodSchema = z.object({
    apiId: z.string({
        required_error: "ID is required.",
        invalid_type_error: "ID be valid"
    }),
    title: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }),
    imageUrl: z.string({
        required_error: "URL is required.",
        invalid_type_error: "Must be a valid URL"
    }),
    contentType: z.enum(["movie", "series", "book", "game"]),
})