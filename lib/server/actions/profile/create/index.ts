"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { ProfileZodSchema } from "./schema";
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
        country, language, imageUrl, isPublic, username
    } = data;

    let newProfile;

    try {
        newProfile = await db.profile.create({
            data: {
                userId, country, language, imageUrl, isPublic, username
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newProfile }
}

export const createProfile = createSafeAction(ProfileZodSchema, create);