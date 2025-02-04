import { z, ZodTypeAny } from "zod";

export const CollectionItemZodSchema = z.object({
    apiId: z.string({
        required_error: "ID is required.",
        invalid_type_error: "ID be valid"
    }),
    contentType: z.enum(["movie", "series", "book", "game"]),
})