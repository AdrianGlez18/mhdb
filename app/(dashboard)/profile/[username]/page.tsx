import ProfileContent from "@/components/profile/profile-content";
import { findProfile } from "@/lib/server/actions/profile/read"
import { findUserProfileByUsername } from "@/lib/server/discover";

const ProfilePage = async ({
  params,
}: {
  params: { username: string }
}) => {
  const profile = await findUserProfileByUsername(params.username);
  return <ProfileContent profileType="external" profile={profile} />;
}

export default ProfilePage;