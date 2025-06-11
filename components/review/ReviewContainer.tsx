import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { Calendar, ThumbsUp, ThumbsDown, Flag, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "@/components/ui/badge";

const ReviewContainer = ({
  review,
  showSpoilers,
  setShowSpoilers,
}: {
  review: any;
  showSpoilers: boolean;
  setShowSpoilers: (value: boolean) => void;
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.trunc(rating);
    const hasHalfStar = (rating * 10) % 10 >= 3;
console.log(fullStars)
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="fill-yellow-400 text-yellow-400 h-4 w-4"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div className="half-star-container">
      {/* Filled icon */}
      <Star className="filled-half-star" />
      {/* Outline icon with clipPath applied */}
      <Star className="outlined-half-star" />
    </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="text-yellow-300 h-4 w-4" />
      );
    }

    return stars;
  };

  return (
    <Card key={review.id} className="w-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar className="h-12 w-12">
          {!review.isAnnonymous && review.user?.profile?.imageUrl ? (
            <AvatarImage
              src={review.user.profile.imageUrl}
              alt={review.user.profile.username}
            />
          ) : null}
          <AvatarFallback>
            {review.isAnnonymous
              ? "A"
              : review.user?.profile?.username?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold capitalize">
                {review.isAnnonymous
                  ? "Anonymous"
                  : review.user?.profile?.username || "Unknown User"}
              </h3>
              <div className="flex items-center">
                {renderStars(review.rating / 2)}
                <span className="ml-2 text-sm font-medium">
                  {(review.rating / 2).toFixed(1)}/5
                </span>
              </div>
            </div>
            <div className="flex items-center text-muted-foreground text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
          {review.isSpoiler && (
            <Badge variant="destructive" className="text-xs">
              Spoiler
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {review.isSpoiler && !showSpoilers ? (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-center text-muted-foreground">
              This review contains spoilers.
              <Button
                variant="link"
                onClick={() => setShowSpoilers(true)}
                className="p-0 h-auto ml-1"
              >
                Show anyway
              </Button>
            </p>
          </div>
        ) : (
          <p className="mt-2 mx-1 text-sm leading-relaxed">{review.body}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Helpful</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Not Helpful</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Flag className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ReviewContainer;
