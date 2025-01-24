"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";
import { ProfileZodSchema } from "./schema";

const readProfile = async (data: InputType): Promise<OutputType> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
        return {
            error: "Unauthorized"
        }
    }

    let newContent;

    try {
        newContent = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        })
        if (!newContent) newContent = undefined
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newContent }
}

export const findProfile = createSafeAction(ProfileZodSchema, readProfile);