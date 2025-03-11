"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { CollectionItemZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const update = async (data: InputType): Promise<OutputType> => {
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
        apiId,
        title,
        imageUrl,
        isWatching,
        timesWatched,
        isFavorited,
        isOwned,
        tags,
        notes,
        userRating,
        author,
        platform,
        contentType,
        overview,
        releaseYear,
        startedWatching,
        completedWatching
    } = data;

    const updated = {
        title,
        imageUrl,
        isWatching,
        timesWatched,
        isFavorited,
        isOwned,
        tags,
        notes,
        userRating,
        author,
        platform,
        overview,
        releaseYear,
        startedWatching,
        completedWatching,
        contentType
    }

    const filteredData = Object.fromEntries(
        Object.entries(updated).filter(([_, value]) => value !== null)
    );

    let newContent;

    try {
        newContent = await db.collectionItem.update({
            where: {
                unique_content_for_user: {
                    apiId,
                    userId,
                    contentType
                }
            },
            data: filteredData
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath("/collection");

    return { data: newContent }
}

export const updateCollectionItem = createSafeAction(CollectionItemZodSchema, update);