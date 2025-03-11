"use server";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/server/db";
import { FollowingZodSchema } from "./schema";
import { createSafeAction } from "@/lib/server/createSafeAction";
import { createClient } from "@/lib/supabase/server";

const create = async (data: InputType): Promise<OutputType> => {
    console.log("In create")
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
        return {
            error: "Unauthorized"
        }
    }

    
    const {
        followerId, followedId
    } = data;

    let newFollowing;

    try {
        const checkFollowing = await db.following.findFirst({
            where: {
                followerId,
                followedId
            }
        })
        if (checkFollowing) {
            return {
                error: "User already followed"
            }
        }

    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    try {
        newFollowing = await db.following.create({
            data: {
                followerId, followedId
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    return { data: newFollowing }
}

export const createFollowing = createSafeAction(FollowingZodSchema, create);