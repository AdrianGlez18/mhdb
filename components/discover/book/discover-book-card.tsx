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
  content: any
  onAddToList?: (id: string) => void
  onViewDetails?: (id: string) => void
  onBuy?: (id: string) => void
}



export default function BookDiscoverCard({
  content,
  onViewDetails,
  onBuy
}: DiscoverCardProps) {

  const book = {
    id: content.id,
    title: content.volumeInfo.title,
    imageUrl: content.volumeInfo.imageLinks?.thumbnail,
    author: content.volumeInfo.authors?.[0],

  }

  const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createWishlistItem, {
    onSuccess: (data) => {
      console.log(data);
      toast.success('Content wishlisted successfully!');
    },
    onError: (error) => {
      toast.error(`Error while wishlisting content: ${error}`);
    }
  });
  //todo ver duplicados
  const onAddToList = () => {
    console.log("adding to wishlist");
    executeCreate({
      apiId: book.id,
      title: book.title,
      imageUrl: book.imageUrl,
      contentType: 'book'
    });
  }

  return (
    <Card className="w-[200px] overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Link href={`/collection/book/add/${content.id}`}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-24 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-center line-clamp-2">{book.title}</h3>
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

