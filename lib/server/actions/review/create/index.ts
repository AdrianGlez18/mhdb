"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ReviewZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const create = async (data: InputType): Promise<OutputType> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
        return {
            error: "Unauthorized"
        }
    }

    const userId = user.id;
    const {
        contentId, 
        contentType,
        body,
        isAnnonymous,
        isSpoiler,
        rating
    } = data; 

    let newContent;

    try {
        newContent = await db.review.findFirst({
            where: {
                contentId,
                userId,
                contentType
            }
        })

        if (newContent) {
            return {
                error: "Content already reviewed"
            }
        }
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    try {
        newContent = await db.review.create({
            data: {
                contentId, userId, contentType, body, isAnnonymous, isSpoiler, rating
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath("/profile");

    return { data: newContent }
}

export const createReview = createSafeAction(ReviewZodSchema, create);