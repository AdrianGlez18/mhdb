"use client"

import { useProfile } from "@/components/context/profile-context";
import ProfileContent from "@/components/profile/profile-content";

export default function ProfilePage() {
    const { profile, loading: profileLoading } = useProfile();

    if (profileLoading) {
        return <div>Loading...</div>;
    }

    return <ProfileContent profileType="user" profile={profile} />;
}