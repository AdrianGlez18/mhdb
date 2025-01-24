"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { MovieZodSchema } from "./schema";
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
        tmdbId, title, imageUrl, isWatching, timesWatched, isFavorited, isOwned, tags, notes, userRating, releaseYear
    } = data;

    let newContent;

    try {
        newContent = await db.movie.create({
            data: {
                tmdbId, userId, title, imageUrl, isWatching, timesWatched, isFavorited, isOwned, tags, notes, userRating, releaseYear
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newContent }
}

export const createMovie = createSafeAction(MovieZodSchema, create);