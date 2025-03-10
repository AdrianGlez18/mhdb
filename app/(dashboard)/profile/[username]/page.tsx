import ProfileContent from "@/components/profile/profile-content";
import { findProfile } from "@/lib/server/actions/profile/read"
import { findUserProfile } from "@/lib/server/discover";

const ProfilePage = async ({
  params,
}: {
  params: { username: string }
}) => {
  const profile = await findUserProfile(params.username);
  return <ProfileContent profileType="external" profile={profile} />;
}

export default ProfilePage;