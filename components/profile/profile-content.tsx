import { ProfileContentItem } from "@/types";
import DiscoverSection from "../discover/shared/discover-section";
import ProfileHeader from "./profile-header";
import ProfileSection from "./profile-section";
import { getIfFollowing, getUserId, getUserProfile } from "@/lib/server/discover";
import { redirect } from "next/navigation";

type ProfileType = "user" | "external"

const ProfileContent = async ({ profileType, profile }: { profileType: ProfileType, profile: any }) => {

    const user = await getUserProfile();

    if (!user || !user?.id) {
        redirect("/");
    }

    const userId = user.id;
    const profileUserId = profile.id;
    const isFollowing = await getIfFollowing(userId, profileUserId);

    const isUserProfile = profileType === "user";

    if (isUserProfile || profile.isPublic) {
        let favoriteMovies: ProfileContentItem[] = [];
        let favoriteSeries: ProfileContentItem[] = [];
        let favoriteBooks: ProfileContentItem[] = [];
        let favoriteGames: ProfileContentItem[] = [];
        profile.collection.map((item: any) => {
            if (item.contentType === "movie" && item.isFavorited) {
                favoriteMovies.push({
                    id: item.apiId,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    userRating: item.userRating,
                    contentType: "movie"
                });
            } else if (item.contentType === "series" && item.isFavorited) {
                favoriteSeries.push({
                    id: item.apiId,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    userRating: item.userRating,
                    contentType: "series"
                });
            } else if (item.contentType === "book" && item.isFavorited) {
                favoriteBooks.push({
                    id: item.apiId,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    userRating: item.userRating,
                    contentType: "book"
                });
            } else if (item.contentType === "game" && item.isFavorited) {
                favoriteGames.push({
                    id: item.apiId,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    userRating: item.userRating,
                    contentType: "game"
                });
            }
        });

        console.log(profile)

        return (
            <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl space-y-8">
                    <ProfileHeader
                        username={profile.username}
                        avatarUrl={profile.imageUrl}
                        bio={profile.bio}
                        following={profile.following.length}
                        followers={profile.followers.length}
                        userId={userId}
                        profileUserId={profileUserId}
                        isFollowing={isFollowing}
                    />

                    {favoriteMovies.length > 0 && <ProfileSection title="Favorite Movies" content={favoriteMovies} contentType="movie" />}
                    {favoriteSeries.length > 0 && <ProfileSection title="Favorite Series" content={favoriteSeries} contentType="series" />}
                    {favoriteBooks.length > 0 && <ProfileSection title="Favorite Books" content={favoriteBooks} contentType="book" />}
                    {favoriteGames.length > 0 && <ProfileSection title="Favorite Games" content={favoriteGames} contentType="game" />}
                    {profile.reviews.map((review: any) => (
                        <div key={review.id}>
                            <h3 className="text-lg font-semibold">{review.title}</h3>
                            <p className="text-muted-foreground">{review.body}</p>
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <ProfileHeader
                    username={profile.username}
                    avatarUrl={profile.imageUrl}
                    bio={profile.bio}
                    following={profile.following.length}
                    followers={profile.followers.length}
                    userId={userId}
                    profileUserId={profileUserId}
                    isFollowing={isFollowing}
                />

                <div className="flex items-center justify-center text-muted-foreground text-lg">
                    This profile is private
                </div>
            </div>
        </main>
    )
}

export default ProfileContent