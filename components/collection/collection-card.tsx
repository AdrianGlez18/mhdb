"use client";

import { Star, Film, Tv, BookOpen, Gamepad2 } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { CollectionItem, WishlistItem } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/useAction";
import { deleteCollectionItem } from "@/lib/server/actions/collection/delete";
import { toast } from "sonner";
import { deleteWishlistItem } from "@/lib/server/actions/wishlist/delete";
import Link from "next/link";

// Define a type that represents either a CollectionItem or a WishlistItem
type CardItem = CollectionItem | WishlistItem;

// Helper function to check if the item is a CollectionItem (has userRating)
const isCollectionItem = (item: CardItem): item is CollectionItem => {
  return "userRating" in item;
};

// Helper function to check if the item is in the collection
const isInCollection = (item: CardItem): item is CollectionItem => {
  return isCollectionItem(item);
};

const CollectionCard = ({ item }: { item: CardItem }) => {
  const router = useRouter();

  const {
    execute: executeDeleteFromCollection,
    fieldErrors: deleteFieldErrors,
  } = useAction(deleteCollectionItem, {
    onSuccess: (data) => {
      toast.success("Content deleted successfully!");
      
    },
    onError: (error) => {
      console.log(deleteFieldErrors, error);
      toast.error("Error while deleting content");
    },
  });

  const {
    execute: executeDeleteFromWishlist,
    fieldErrors: deleteWishFieldErrors,
  } = useAction(deleteWishlistItem, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Content deleted successfully!");
      
    },
    onError: (error) => {
      console.log(deleteFieldErrors, error);
      toast.error("Error while deleting content");
    },
  });

  const handleDeleteFromCollection = async () => {
    executeDeleteFromCollection({
      apiId: item.apiId,
      contentType: item.contentType,
    });
  };

  const handleDeleteFromWishlist = async () => {
    executeDeleteFromWishlist({
      apiId: item.apiId,
      contentType: item.contentType,
    });
  };

  const addedAt = new Date(item.createdAt).toLocaleDateString();
  return (
    <Card className="group overflow-hidden">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Only render rating if item is a CollectionItem */}
        {isCollectionItem(item) && (
          <div className="absolute left-2 top-2 flex items-center justify-center gap-1 rounded-full bg-background/80 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
            {item.userRating}
            <Star className="h-3 w-3 fill-primary text-primary" />
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-1 text-sm font-semibold backdrop-blur-sm cursor-pointer z-40 text-primary">
              {item.contentType === "movie" ? (
                <Film className="h-4 w-4" />
              ) : item.contentType === "series" ? (
                <Tv className="h-4 w-4" />
              ) : item.contentType === "book" ? (
                <BookOpen className="h-4 w-4" />
              ) : (
                <Gamepad2 className="h-4 w-4" />
              )}
            </div>
          </DropdownMenuTrigger>

          {isCollectionItem(item) ? (
            <DropdownMenuContent className="w-56 cursor-pointer">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/collection/${item.contentType}/update/${item.apiId}`
                    )
                  }
                >
                  Edit in collection
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={`/discover/${item.contentType}/${item.apiId}`}>
                    View details
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-400 cursor-pointer"
                onClick={handleDeleteFromCollection}
              >
                Delete from collection
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/collection/${item.contentType}/add/${item.apiId}`
                    )
                  }
                >
                  Add to collection
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={`/discover/${item.contentType}/${item.apiId}`}>
                    View details
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-400 cursor-pointer"
                onClick={handleDeleteFromWishlist}
              >
                Delete from wishlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
          <p className="text-xs text-gray-300">Added {addedAt}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {isCollectionItem(item) && item.tags && item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black/20 hover:bg-black/30 text-gray-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CollectionCard;
