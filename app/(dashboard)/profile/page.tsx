/* "use client" */

/* import { useProfile } from "@/components/context/profile-context"; */
import ProfileContent from "@/components/profile/profile-content";
import { findUserProfileByUsername, getUserId, getUsername } from "@/lib/server/discover";
import { notFound } from "next/navigation";

const ProfilePage = async () => {
    /* const { profile, loading: profileLoading } = useProfile(); */

    /* if (profileLoading) {
        return <div>Loading...</div>;
    } */
    const username = await getUsername();

    if (!username || !username.data) {
        return notFound();
    }

    const profile = await findUserProfileByUsername(username.data!);
    return <ProfileContent profileType="user" profile={profile} />;
}

export default ProfilePage;