import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import FollowButton from "./follow-button"

interface ProfileHeaderProps {
  userId: string
  profileUserId: string
  isFollowing: boolean
  username: string
  avatarUrl: string
  bio: string
  following: number
  followers: number
}

export default function ProfileHeader({ userId, profileUserId, isFollowing, username, avatarUrl, bio, following, followers }: ProfileHeaderProps) {
  console.log(userId, profileUserId, isFollowing)
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary to-primary-foreground/20" />
      <CardContent className="relative -mt-16 space-y-6 px-6 pb-6">
        <div className="w-full flex items-center justify-center">
        <Avatar className="h-32 w-32 border-4 border-background">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.toUpperCase()}</AvatarFallback>
        </Avatar>
        </div>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{username}</h1>
            <p className="text-muted-foreground">{bio}</p>
          </div>
          {
            userId !== profileUserId && <FollowButton followerId={userId} followedId={profileUserId} following={isFollowing}/>
          }
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-semibold">{following}</span> <span className="text-muted-foreground">Following</span>
          </div>
          <div>
            <span className="font-semibold">{followers}</span> <span className="text-muted-foreground">Followers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

