"use client"

import Link from "next/link"
import { ArrowLeft, BookmarkPlus, Play, ShoppingCart, Star, Gamepad2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useAction } from "@/hooks/useAction"
import { checkItemInCollection } from "@/lib/server/actions/collection/read"
import { createWishlistItem } from "@/lib/server/actions/wishlist/create"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useProfile } from "@/components/context/profile-context"
import { getIfItemIsInCollection } from "@/lib/server/discover"

export default function MediaDetails({ content }: { content: any }) {
    const router = useRouter();
    const { profile, loading } = useProfile();
    const [isInCollection, setIsInCollection] = useState(false);
    
    // IGDB API returns an array, even for single game lookups
    const game = Array.isArray(content) && content.length > 0 ? content[0] : content;

    useEffect(() => {
        const checkCollection = async () => {
            if (!loading && profile) {
                const isInCollection = await getIfItemIsInCollection(game.id.toString(), 'game');
                setIsInCollection(isInCollection);
            }
        };
        
        checkCollection();
    }, [profile, loading, game.id]);

    const { execute: executeAddWish, fieldErrors: addWishFieldErrors } = useAction(createWishlistItem, {
        onSuccess: (data) => {
            toast.success('Game added to wishlist successfully!');
        },
        onError: (error) => {
            toast.error(`Error while adding game to wishlist: ${error}`);
        }
    });

    const { execute: executeCheck, fieldErrors: createFieldErrors } = useAction(checkItemInCollection, {
        onSuccess: (data) => {
            router.push(`/collection/game/add/${data.apiId}`);
        },
        onError: (error) => {
            toast.error(`Error: ${error}`);
        }
    });

    const onAddToWishlistList = () => {
        executeAddWish({
            apiId: game.id.toString(),
            title: game.name,
            imageUrl: game.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : '/placeholder-game.jpg',
            contentType: 'game',
        });
    }

    const onAddToCollection = () => {
        executeCheck({
            apiId: game.id.toString(),
            contentType: 'game',
        });
    }

    // Format release date from Unix timestamp
    const releaseDate = game.first_release_date 
        ? new Date(game.first_release_date * 1000).getFullYear() 
        : 'Unknown';

    // Create a media object with the game data
    const media = {
        id: game.id.toString(),
        title: game.name,
        imageUrl: game.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : '/placeholder-game.jpg',
        description: game.summary || 'No description available',
        releaseYear: releaseDate,
        genres: game.genres?.map((genre: any) => genre.name) || [],
        platforms: game.platforms?.map((platform: any) => platform.name) || [],
        buyUrl: `https://www.amazon.com/s?k=${game.name.replace(' ', '+')}+game`,
    }

    return (
        <main className="min-h-screen bg-background px-4 py-2 md:px-6 lg:px-8 flex justify-center w-full">
            <div className="mx-auto max-w-screen-2xl">
                <Button
                    variant="ghost"
                    asChild
                    className="mb-4"
                    onClick={() => router.back()}
                >
                    <div className="cursor-pointer">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </div>
                </Button>

                <div className="grid gap-6 lg:grid-cols-[300px,1fr] lg:gap-12">
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-lg">
                            <img
                                src={media.imageUrl}
                                alt={`${media.title} cover`}
                                className="aspect-[3/4] w-full object-cover"
                            />
                        </div>
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold">{media.title}</h1>
                            <Button className="w-full" onClick={onAddToCollection}>
                                <BookmarkPlus className="mr-2 h-4 w-4" />
                                {isInCollection ? 'Edit in Collection' : 'Add to Collection'}
                            </Button>
                            <Button className="w-full" onClick={onAddToWishlistList}>
                                <BookmarkPlus className="mr-2 h-4 w-4" />
                                Add to Wishlist
                            </Button>
                            <Button className="w-full" disabled>
                                <BookmarkPlus className="mr-2 h-4 w-4" />
                                Write a review (soon)
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            {media.genres && media.genres.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {media.genres.map((genre: string) => (
                                        <Badge key={genre} variant="secondary">
                                            {genre}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{media.releaseYear}</span>
                                {media.platforms && media.platforms.length > 0 && (
                                    <span className="flex items-center">
                                        <Gamepad2 className="mr-1 h-4 w-4" />
                                        {media.platforms.join(', ')}
                                    </span>
                                )}
                            </div>
                            <p className="text-lg leading-relaxed">{media.description}</p>
                        </div>

                        <Separator />

                        <div className="flex gap-4">
                            {
                                media.buyUrl &&
                                <Button size="lg" className="gap-2" asChild>
                                    <a href={media.buyUrl} target="_blank" rel="noopener noreferrer">
                                        <ShoppingCart className="h-5 w-5" />
                                        Check online
                                    </a>
                                </Button>
                            }
                        </div>

                        <Separator />

                        {/* Game recommendations could be added here in the future */}
                    </div>
                </div>
            </div>
        </main>
    )
}
