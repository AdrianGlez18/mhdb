"use client"

import Link from "next/link"
import { ArrowLeft, BookmarkPlus, Play, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import MovieCrew from "@/components/discover/shared/media-crew"
import { useRouter } from "next/navigation"
import { useAction } from "@/hooks/useAction"
import { checkItemInCollection } from "@/lib/server/actions/collection/read"
import { createWishlistItem } from "@/lib/server/actions/wishlist/create"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useProfile } from "@/components/context/profile-context"
import TrailerButton from "./trailer-button"
//import MovieRecommendations from "@/components/movie-recommendations"

export default function MediaDetails({ content }: { content: any }) {

    const router = useRouter();
    const { profile, loading } = useProfile();
    const [isIncollection, setIsIncollection] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!loading && profile && profile.collection) {
            setIsIncollection(profile.collection.some((item: any) => item.apiId === content.id.toString()));
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
            const contentType = content.media_type === 'movie' ? 'movie' : 'series';
            router.push(`/collection/${contentType}/add/${data.apiId}`);
        },
        onError: (error) => {
            toast.error(`Error: ${error}`);
        }
    });

    const onAddToWishlistList = () => {
        executeAddWish({
            apiId: content.id.toString(),
            title: (content.title || content.name || ''),
            imageUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${content.poster_path}`,
            contentType: content.media_type === 'movie' ? 'movie' : 'series',
        });
    }

    const onAddToCollection = () => {
        executeCheck({
            apiId: content.id.toString(),
            contentType: content.media_type === 'movie' ? 'movie' : 'series',
        });
    }

    /* const recommendations = [
      {
        id: "2",
        title: "The Matrix",
        imageUrl: "https://source.unsplash.com/300x450/?movie,matrix",
        score: 8.7,
        description: "...",
        crew: [],
        releaseYear: 1999,
        duration: "2h 16min",
        genres: ["Action", "Sci-Fi"]
      },
      {
        id: "3",
        title: "Interstellar",
        imageUrl: "https://source.unsplash.com/300x450/?movie,space",
        score: 8.6,
        description: "...",
        crew: [],
        releaseYear: 2014,
        duration: "2h 49min",
        genres: ["Adventure", "Drama", "Sci-Fi"]
      },
      {
        id: "4",
        title: "The Prestige",
        imageUrl: "https://source.unsplash.com/300x450/?movie,magic",
        score: 8.5,
        description: "...",
        crew: [],
        releaseYear: 2006,
        duration: "2h 10min",
        genres: ["Drama", "Mystery", "Sci-Fi"]
      }
    ] */

    const contentDistribution = content.runtime ?
        content.runtime + ' min' :
        (content.number_of_seasons ? content.number_of_seasons + ' seasons, ' : '') +
        (content.number_of_episodes ? content.number_of_episodes + ' episodes, ' : '') +
        (content.episode_run_time.length > 0 ? content.episode_run_time[0] + ' min each' : '');
    const media = {
        id: content.id,
        title: content.title || content.name,
        imageUrl: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${content.poster_path}`,
        rating: Math.round(content.vote_average * 10) / 10,
        description: content.overview,
        releaseYear: content.release_date?.split('-')[0] || content.first_air_date?.split('-')[0],
        genres: content.genres.map((genre: any) => genre.name),
        duration: contentDistribution,
        trailer: content.videos.results.find((video: any) => video.type === 'Trailer')?.key,
        homepage: content.homepage,
        crew: content.credits.cast.map((actor: any) => ({
            id: actor.id,
            name: actor.name,
            role: actor.character,
            imageUrl: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`
        }))
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
                            <div className="flex items-center justify-center gap-2">
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <span className="text-xl font-semibold">{media.rating}/10</span>
                            </div>
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
                            <div className="flex flex-wrap gap-2">
                                {media.genres.map((genre: string) => (
                                    <Badge key={genre} variant="secondary">
                                        {genre}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{media.releaseYear}</span>
                                <span>{media.duration}</span>
                            </div>
                            <p className="text-lg leading-relaxed">{media.description}</p>
                        </div>

                        <Separator />

                        <div className="flex gap-4">
                            {
                                media.trailer &&
                                <TrailerButton
                                    title={media.title}
                                    youtubeKey={media.trailer}
                                    description={media.description}
                                    isDialogOpen={isDialogOpen}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                            }

                            {
                                media.homepage &&
                                <Button size="lg" className="gap-2" asChild>
                                    <a href={media.homepage} target="_blank" rel="noopener noreferrer">
                                        <Play className="h-5 w-5" />
                                        Check online
                                    </a>
                                </Button>
                            }
                        </div>

                        <Separator />

                        <MovieCrew crew={media.crew} />

                        <Separator />

                        {/* <MovieRecommendations movies={recommendations} /> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

