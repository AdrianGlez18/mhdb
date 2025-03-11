import { z, ZodTypeAny } from "zod";

export const FollowingZodSchema = z.object({
    followerId: z.string(),
    followedId: z.string(),
})
