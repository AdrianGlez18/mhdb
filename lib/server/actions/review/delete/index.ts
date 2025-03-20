"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { CollectionItemZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const deleteItem = async (data: InputType): Promise<OutputType> => {
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
        contentType,
    } = data;

    let newContent;

    try {
        newContent = await db.collectionItem.delete({
            where: {
                unique_content_for_user: {
                    apiId,
                    userId,
                    contentType
                }
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath("/collection");
    
    return { data: newContent }
}

export const deleteCollectionItem = createSafeAction(CollectionItemZodSchema, deleteItem);