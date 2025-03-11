"use client";

import { useAction } from "@/hooks/useAction";
import { createFollowing } from "@/lib/server/actions/follow/create";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface FollowButtonProps {
    followerId: string,
    followedId: string,
    following: boolean
}

const FollowButton = ({followerId, followedId, following}: FollowButtonProps) => {

    const [isFollowing, setIsFollowing] = useState(following);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { execute: executeFollow } = useAction(createFollowing, {
        onSuccess: () => {
            toast.success("User followed");
        },
        onError: () => {
            toast.error("Error while following. Please, try again later.")
        }
    });

    const handleClick = async () => {

        setIsSubmitting(true);

        if (isFollowing) {
            console.log("Executing...")
            await executeFollow({
                followerId,
                followedId
            });
            setIsFollowing(!isFollowing);
        } else {
            console.log("Executing...")
            await executeFollow({
                followerId,
                followedId
            });
            setIsFollowing(!isFollowing);
        }

        setIsSubmitting(false);
    }
  return (
    <Button onClick={handleClick} disabled={isSubmitting}>
        {isFollowing ? 'Unfollow' : 'Folow'}
    </Button>
  )
}

export default FollowButton