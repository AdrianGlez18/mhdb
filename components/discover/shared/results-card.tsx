"use client"

import { BookmarkPlus, HousePlus, Info, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { DiscoverMovie } from "@/types"
import { useAction } from '@/hooks/useAction'
import { createWishlistItem } from '@/lib/server/actions/wishlist/create'
import { toast } from 'sonner'
import Link from 'next/link'
import { createCollectionItem } from '@/lib/server/actions/collection/create'
import { useRouter } from 'next/navigation'
import { checkItemInCollection } from '@/lib/server/actions/collection/read'
import { useState } from 'react'
import { ContentType } from '@prisma/client'

interface ResultsCardProps {
  content: any //todo check
  contentType: "movie" | "series" | "book" | "game"
  onBuy?: (id: string) => void
}



export default function ResultsCard({
  content,
  contentType,
  onBuy
}: ResultsCardProps) {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { execute: executeAddWish, fieldErrors: addWishFieldErrors } = useAction(createWishlistItem, {
    onSuccess: (data) => {
      toast.success('Content wishlisted successfully!');
    },
    onError: (error) => {
      toast.error(`Error while wishlisting content: ${error}`);
    }
  });

  const { execute: executeCheck, fieldErrors: createFieldErrors } = useAction(checkItemInCollection, {
    onSuccess: (data) => {
      router.push(`/collection/${contentType}/add/${data.apiId}`);
    },
    onError: (error) => {
      toast.error(`Error: ${error}`);
    }
  });

  const onAddToWishlistList = () => {
    setIsSubmitting(true);
    const imageUrl = contentType === 'book'
    ? content.volumeInfo.imageLinks?.thumbnail : contentType === 'game' 
    ? (content.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${content.cover.image_id}.jpg` : '') :  `https://image.tmdb.org/t/p/w600_and_h900_bestv2${content.poster_path}`;
    executeAddWish({
      apiId: content.id.toString(),
      title: (content.title || content.name || ''),
      imageUrl,
      contentType,
    });
    setIsSubmitting(false);
  }

  const onAddToCollection = () => {
    setIsSubmitting(true);
    executeCheck({
      apiId: content.id.toString(),
      contentType: contentType,
    });
    setIsSubmitting(false);
  }

  const imageUrl = contentType === 'book'
    ? content.volumeInfo.imageLinks?.thumbnail : contentType === 'game' 
    ? (content.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${content.cover.image_id}.jpg` : '') :  `https://image.tmdb.org/t/p/w600_and_h900_bestv2${content.poster_path}`;
  const title = contentType === 'book' 
  ? content.volumeInfo.title : (content.title || content.name)

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Link href={`/discover/${contentType}/${content.id}`}>
            <img
              src={imageUrl}
              alt={`${title} poster`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <div className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-sm font-bold text-white">
            {content.vote_average ? Math.round(content.vote_average * 10) / 10 : '¿?'}/10
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="line-clamp-2 text-xl font-bold text-center">{title}</h3>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onAddToWishlistList}
                className="aspect-square"
                disabled={isSubmitting}
              >
                <BookmarkPlus className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to wishlist</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="aspect-square"
                disabled={isSubmitting}
                asChild
              >
                <Link href={`/discover/${contentType}/${content.id}`}>
                  <Info className="h-5 w-5" />
                  <span className="sr-only">View details</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View details</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                onClick={onAddToCollection}
                className="aspect-square"
                disabled={isSubmitting}
              >
                <HousePlus className="h-5 w-5" />
                <span className="sr-only">Add to collection</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to collection</p>
            </TooltipContent>
          </Tooltip>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                onClick={() => onBuy?.(content.id!)}
                className="aspect-square"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Check shop</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Check shop</p>
            </TooltipContent>
          </Tooltip> */}
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

