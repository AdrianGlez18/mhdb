"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { CollectionItemZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";

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
        releaseYear, 
        author, 
        platform, 
        contentType, 
        startedWatching, 
        completedWatching
    } = data;

    let newContent;

    try {
        newContent = await db.collectionItem.create({
            data: {
                apiId, userId, title, imageUrl, isWatching, timesWatched, isFavorited, isOwned, tags, notes, userRating, releaseYear, author, platform, contentType, startedWatching, completedWatching
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newContent }
}

export const createCollectionItem = createSafeAction(CollectionItemZodSchema, create);