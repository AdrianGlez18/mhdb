import { z, ZodTypeAny } from "zod";

export const CollectionItemZodSchema = z.object({
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
    timesWatched: z.number().min(0),
    isWatching: z.boolean(),
    isFavorited: z.boolean(),
    isOwned: z.boolean(),
    tags: z.array(z.string()).optional(),
    plainTags: z.string().optional(),
    notes: z.string().optional(),
    overview: z.string().optional(),
    userRating: z.number().optional(),
    releaseYear: z.number().optional(),
    startedWatching: z.date().optional(),
    completedWatching: z.date().optional(),
    author: z.string().optional(),
    platform: z.string().optional(),
    contentType: z.enum(["movie", "series", "book", "game"]),
})