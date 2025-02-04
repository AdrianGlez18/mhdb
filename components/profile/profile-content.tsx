import { ProfileContentItem } from "@/types";
import DiscoverSection from "../discover/shared/discover-section";
import ProfileHeader from "./profile-header";
import ProfileSection from "./profile-section";

type ProfileType = "user" | "external"

const ProfileContent = ({ profileType, profile }: { profileType: ProfileType, profile: any }) => {

    const isUserProfile = profileType === "user";

    let favoriteMovies: ProfileContentItem[] = [];
    profile.collection.map((item: any) => {
        if (item.contentType === "movie" && item.isFavorited) {
            favoriteMovies.push({
                id: item.apiId,
                title: item.title,
                imageUrl: item.imageUrl,
                userRating: item.userRating,
                contentType: "movie"
            })
        }
    });
    
    let favoriteSeries: ProfileContentItem[] = [];
    profile.collection.map((item: any) => {
        if (item.contentType === "series" && item.isFavorited) {
            favoriteSeries.push({
                id: item.apiId,
                title: item.title,
                imageUrl: item.imageUrl,
                userRating: item.userRating,
                contentType: "series"
            })
        }
    });

   /*  if (!isUserProfile && !profile.isPublic) {
        return <div>Private profile</div>
    } */

    return (
        <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <ProfileHeader
                    username={profile.profile.username}
                    avatarUrl={profile.profile.imageUrl}
                    bio={profile.bio}
                    following={profile.following}
                    followers={profile.followers}
                />

                {favoriteMovies.length > 0 && <ProfileSection title="Favorite Movies" content={favoriteMovies} contentType="movie" />}
                {favoriteSeries.length > 0 && <ProfileSection title="Favorite Series" content={favoriteSeries} contentType="series" />}
                {/* <ProfileSection title="Favorite Series" content={profile.favoriteMovies} contentType="series"/> */}
                {/* <DiscoverSection title="Favorite Books" content={profile.favoriteBooks} />
                <DiscoverSection title="Favorite Games" items={profile.favoriteGames} /> */}

                {/* <ReviewSection reviews={profile.reviews} /> */}
            </div>
        </main>
    )
}

export default ProfileContent