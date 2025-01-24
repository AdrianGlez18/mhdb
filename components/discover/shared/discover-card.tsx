"use client"

import { BookmarkPlus, Info, ShoppingCart } from 'lucide-react'
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

interface DiscoverCardProps {
  content: DiscoverMovie
  onAddToList?: (id: string) => void
  onViewDetails?: (id: string) => void
  onBuy?: (id: string) => void
}



export default function DiscoverCard({ 
content,
  onViewDetails, 
  onBuy 
}: DiscoverCardProps) {

  const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createWishlistItem, {
    onSuccess: (data) => {
        toast.success('Content wishlisted successfully!');
    },
    onError: (error) => {
        toast.error(`Error while wishlisting content: ${error}`);
    }
});
//todo ver duplicados
  const onAddToList = () => {
    executeCreate({ 
      apiId: content.id.toString(), 
      title: (content.title || content.name || ''), 
      imageUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${content.poster_path}`, 
      contentType: content.media_type === 'movie' ? 'movie' : 'series',
    });
  }

  return (
    <Card className="w-[200px] overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Link href={`/discover/${content.media_type === 'movie' ? 'movie' : 'series'}/${content.id}/add`}>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${content.poster_path}`}
            alt={`${content.title} poster`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          </Link>
          <div className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-sm font-bold text-white">
            {content.vote_average ? Math.round(content.vote_average * 10) / 10 : '¿?'}/10
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="line-clamp-2 text-xl font-bold text-center">{content.title || content.name}</h3>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onAddToList}
                className="aspect-square"
              >
                <BookmarkPlus className="h-5 w-5" />
                <span className="sr-only">Add to list</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to list</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onViewDetails?.(content.id!)}
                className="aspect-square"
              >
                <Info className="h-5 w-5" />
                <span className="sr-only">View details</span>
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
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

