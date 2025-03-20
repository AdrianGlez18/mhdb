import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Star, StarHalf } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { createReview } from '@/lib/server/actions/review/create';
import { useAction } from '@/hooks/useAction';

// Define the schema for the review form
const ReviewFormSchema = z.object({
  contentId: z.string().nonempty('Content ID is required.'),
  userId: z.string().nonempty('User ID is required.'),
  contentType: z.enum(['movie', 'series', 'book', 'game']),
  rating: z.number().min(0, 'Rating must be at least 0.').max(10, 'Rating cannot exceed 10.'),
  body: z.string().nonempty('Review body is required.'),
  isAnnonymous: z.boolean(),
  isSpoiler: z.boolean()
});

type ReviewFormData = z.infer<typeof ReviewFormSchema>;

interface ReviewFormProps {
  contentId: string;
  userId: string;
  contentType: 'movie' | 'series' | 'book' | 'game';
  setIsReviewDialogOpen: (open: boolean) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ contentId, userId, contentType, setIsReviewDialogOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      contentId,
      userId,
      contentType,
      rating: 5,
      body: '',
      isAnnonymous: false,
      isSpoiler: false,
    },
  });

  const {execute } = useAction(createReview, {
    onSuccess: (data) => {
      toast.success("Review submitted successfully!");
    },
    onError: (error) => {
      toast.error("Error while submitting review");
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      await execute(data);
      setIsReviewDialogOpen(false);
    } catch (error) {
      toast.error('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating * 10) % 10 >= 3;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 10 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <div className="flex justify-center mb-2">
                {renderStars(field.value)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">0</span>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <span className="text-sm">10</span>
              </div>
              <div className="text-center text-sm mt-1">
                {field.value.toFixed(1)} / 10
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your review here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isSpoiler"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Contains Spoilers</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAnnonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Post Anonymously</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <p className='text-muted-foreground text-sm'>Note: All reviews are public by default. Selecting to publish it annonymously will hide your username and the review will not appear in your profile.</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;