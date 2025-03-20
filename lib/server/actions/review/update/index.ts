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
        completedWatching,
        watchLog
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
    let existingItem;

    try {
        // Find the collection item first to get its ID
        existingItem = await db.collectionItem.findFirst({
            where: {
                apiId,
                userId,
                contentType
            }
        });

        console.log("Existing item:", existingItem);
        console.log("Filtered data:", filteredData);

        if (!existingItem) {
            return {
                error: "Collection item not found"
            }
        }

        // Update using the ID which is a unique identifier
        newContent = await db.collectionItem.update({
            where: {
                id: existingItem.id
            },
            data: {
                ...filteredData,
                // Update the ID because it is not being updated
                id: existingItem.id
            }
        })

    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    // Update watchLog
    try {
        if (watchLog && watchLog.length > 0) {
            await db.contentView.deleteMany({
                where: {
                    collectionItemId: existingItem.id,
                    userId
                }
            });
            await db.contentView.createMany({
                data: watchLog.map(log => ({
                    collectionItemId: existingItem.id,
                    userId,
                    apiId,
                    contentType,
                    startDate: log.startDate,
                    endDate: log.endDate,
                    notes: log.notes || ""
                }))
            });
        }
    } catch (error) {
        return {
            error: "Internal error while updating views"
        }
    }

    revalidatePath("/collection");

    return { data: newContent }
}

export const updateCollectionItem = createSafeAction(CollectionItemZodSchema, update);