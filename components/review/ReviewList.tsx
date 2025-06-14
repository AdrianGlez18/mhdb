"use client"

import React, { useEffect, useState } from 'react';
import { useAction } from '@/hooks/useAction';
import { db } from '@/lib/server/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, AlertTriangle, ThumbsUp, ThumbsDown, Flag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReviewContainer from './ReviewContainer';

// Define the review type
interface Review {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'movie' | 'series' | 'book' | 'game';
  rating: number;
  body: string;
  isAnnonymous: boolean;
  isSpoiler: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    profile?: {
      username: string;
      imageUrl?: string;
    }
  }
}

interface ReviewListProps {
  contentId: string;
  contentType: 'movie' | 'series' | 'book' | 'game';
}

const ReviewList: React.FC<ReviewListProps> = ({ contentId, contentType }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
  const [showSpoilers, setShowSpoilers] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would be a server action
        const response = await fetch(`/api/reviews?contentId=${contentId}&contentType=${contentType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [contentId, contentType]);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return b.rating - a.rating;
    }
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating * 10) % 10 >= 3;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half-star" className="fill-yellow-400 text-yellow-400 h-4 w-4 fill-half" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300 h-4 w-4" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
        <p className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={sortBy === 'recent' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Most Recent
          </Button>
          <Button 
            variant={sortBy === 'rating' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('rating')}
          >
            Highest Rated
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSpoilers(!showSpoilers)}
          >
            {showSpoilers ? 'Hide Spoilers' : 'Show Spoilers'}
          </Button>
        </div>
      </div>

      {reviews.length === 0 ? (
        <Card className="w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <ReviewContainer
              key={review.id}
              review={review}
              showSpoilers={showSpoilers}
              setShowSpoilers={setShowSpoilers}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
