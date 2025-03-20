"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { CollectionItemZodSchema } from "./schema";
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
        completedWatching,
        overview,
        watchLog
    } = data; 

    let newContent;

    try {
        newContent = await db.collectionItem.findFirst({
            where: {
                apiId,
                userId,
                contentType
            }
        })

        if (newContent) {
            return {
                error: "Content already in collection"
            }
        }
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    try {
        newContent = await db.collectionItem.create({
            data: {
                apiId, userId, title, imageUrl, isWatching, timesWatched, isFavorited, isOwned, tags, overview, notes, userRating, releaseYear, author, platform, contentType, startedWatching, completedWatching
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    console.log("Watchlog: ", watchLog)
    if (watchLog && watchLog.length > 0) {
        console.log("Watchlog: ", watchLog)
        try {
            // Create content views for each watch log entry
            await Promise.all(
                watchLog.map(async (log) => {
                    await db.contentView.create({ 
                        data: {
                            userId,
                            apiId,
                            contentType,
                            collectionItemId: newContent.id,
                            startDate: log.startDate,
                            endDate: log.endDate,
                            notes: log.notes || ""
                        }
                    });
                })
            );
        } catch (error) {
            console.error("Error creating content views:", error);
        }
    }

    revalidatePath("/collection");

    return { data: newContent }
}

export const createCollectionItem = createSafeAction(CollectionItemZodSchema, create);