"use client"

import { useProfile } from "@/components/context/profile-context";

export default function ProfilePage() {
    const { profile, loading: profileLoading } = useProfile();

    if (profileLoading) {
        return <div>Loading...</div>;
    }
console.log(profile)
    return <div>{profile.name}</div>;
}