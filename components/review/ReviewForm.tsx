import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

// Define the schema for the review form
const ReviewFormSchema = z.object({
  contentId: z.string().nonempty('Content ID is required.'),
  userId: z.string().nonempty('User ID is required.'),
  contentType: z.enum(['movie', 'series', 'book', 'game']),
  rating: z.number().min(1, 'Rating must be at least 1.').max(10, 'Rating cannot exceed 10.'),
  body: z.string().nonempty('Review body is required.'),
  isAnnonymous: z.boolean()
});

type ReviewFormData = z.infer<typeof ReviewFormSchema>;

interface ReviewFormProps {
  contentId: string;
  userId: string;
  contentType: 'movie' | 'series' | 'book' | 'game';
}

const ReviewForm: React.FC<ReviewFormProps> = ({ contentId, userId, contentType }) => {
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
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log('Submitting review:', data);
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
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
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
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

        <p className='text-muted-foreground text-sm'>Note: All reviews are public by default. Selecting to publish it annonymously will hide your username and the review will not appear in your profile.</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm; 