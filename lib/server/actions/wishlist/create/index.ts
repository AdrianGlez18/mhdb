"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { WishlistZodSchema} from "./schema";
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
        apiId, title, imageUrl, contentType
    } = data;

    let newContent;

    try {
        newContent = await db.wishlistItem.findFirst({
            where: {
                apiId,
                userId
            }
        })

        if (newContent) {
            return {
                error: "Content already in wishlist"
            }
        }
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    try {
        newContent = await db.wishlistItem.create({
            data: {
                apiId, userId, title, imageUrl, contentType
            }
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Internal database error"
        }
    }

    return { data: newContent }
}

export const createWishlistItem = createSafeAction(WishlistZodSchema, create);