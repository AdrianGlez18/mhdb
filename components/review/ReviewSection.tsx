"use client"

import React from 'react';
import ReviewList from './ReviewList';
import { Separator } from '@/components/ui/separator';

interface ReviewSectionProps {
  contentId: string;
  contentType: 'movie' | 'series' | 'book' | 'game';
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ contentId, contentType }) => {
  return (
    <div className="space-y-6">
      <Separator />
      <ReviewList contentId={contentId} contentType={contentType} />
    </div>
  );
};

export default ReviewSection;
