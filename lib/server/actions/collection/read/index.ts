"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { CollectionItemZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";

const checkItem = async (data: InputType): Promise<OutputType> => {
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
        newContent = await db.collectionItem.findFirst({
            where: {
                apiId,
                userId,
                contentType
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    if (newContent) {
        return {
            error: "Content already in collection"
        }
    }

    else {
        return {
            data: data
        }
    }
}

export const checkItemInCollection = createSafeAction(CollectionItemZodSchema, checkItem);