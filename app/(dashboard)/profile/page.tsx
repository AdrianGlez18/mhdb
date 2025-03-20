import ProfileContent from "@/components/profile/profile-content";
import { findUserProfileByUsername, getUsername } from "@/lib/server/discover";
import { notFound } from "next/navigation";

const ProfilePage = async () => {
    const username = await getUsername();

    if (!username || !username.data) {
        return notFound();
    }

    const profile = await findUserProfileByUsername(username.data!);
    return <ProfileContent profileType="user" profile={profile} />;
}

export default ProfilePage;