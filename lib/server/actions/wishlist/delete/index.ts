"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { WishlistItemZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";

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
        newContent = await db.wishlistItem.delete({
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

    return { data: newContent }
}

export const deleteWishlistItem = createSafeAction(WishlistItemZodSchema, deleteItem);