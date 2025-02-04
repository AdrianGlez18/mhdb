"use client"

import Link from "next/link"
import { ArrowLeft, BookmarkPlus, Play, ShoppingCart, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useAction } from "@/hooks/useAction"
import { checkItemInCollection } from "@/lib/server/actions/collection/read"
import { createWishlistItem } from "@/lib/server/actions/wishlist/create"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useProfile } from "@/components/context/profile-context"
//import MovieRecommendations from "@/components/movie-recommendations"

export default function MediaDetails({ content }: { content: any }) {

    const router = useRouter();
    const { profile, loading } = useProfile();
    const [isIncollection, setIsIncollection] = useState(false);

    useEffect(() => {
        if (!loading && profile && profile.collection) {
            setIsIncollection(profile.collection.some((item: any) => item.apiId === content.id));
        }
    }, [profile]);

    //TODO Arreglar responsive. Recomendations

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
            const contentType = 'book';
            router.push(`/collection/${contentType}/add/${data.apiId}`);
        },
        onError: (error) => {
            toast.error(`Error: ${error}`);
        }
    });

    const onAddToWishlistList = () => {
        executeAddWish({
            apiId: content.id,
            title: content.volumeInfo.title,
            imageUrl: content.volumeInfo.imageLinks.thumbnail,
            contentType: 'book',
        });
    }

    const onAddToCollection = () => {
        executeCheck({
            apiId: content.id,
            contentType: 'book',
        });
    }

    const contentDistribution = content.volumeInfo.pageCount + ' pages (ebook), ' + content.volumeInfo.printedPageCount + ' pages (paperback)';
    const media = {
        id: content.id,
        title: content.volumeInfo.title,
        imageUrl: content.volumeInfo.imageLinks.thumbnail,
        author: content.volumeInfo.authors,
        isbn: content.volumeInfo.industryIdentifiers?.find((identifier: any) => identifier.type === 'ISBN_13')?.identifier,
        //rating: todo calculate rating from collections and add to image
        description: content.volumeInfo.description,
        releaseYear: content.volumeInfo.publishedDate?.split('-')[0],
        pages: contentDistribution,
        buyUrl: `https://www.amazon.com/s?k=${content.volumeInfo.title.replace(' ', '+')}`,
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
                                alt={`${media.title} poster`}
                                className="aspect-[2/3] w-full object-cover"
                            />
                        </div>
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold">{media.title}</h1>
                            {/* <div className="flex items-center justify-center gap-2">
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <span className="text-xl font-semibold">{media.rating}/10</span>
                            </div> */}
                            <Button className="w-full" onClick={onAddToCollection}>
                                <BookmarkPlus className="mr-2 h-4 w-4" />
                                {isIncollection ? 'Edit in Collection' : 'Add to Collection'}
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
                            {/* <div className="flex flex-wrap gap-2">
                                {media.genres.map((genre: string) => (
                                    <Badge key={genre} variant="secondary">
                                        {genre}
                                    </Badge>
                                ))}
                            </div> */}
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{media.releaseYear}</span>
                                <span>{media.pages}</span>
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

                        {/* <MovieRecommendations movies={recommendations} /> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

