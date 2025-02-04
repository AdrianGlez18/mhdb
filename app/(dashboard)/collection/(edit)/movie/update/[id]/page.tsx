"use client"

import EditMovieForm from "@/components/collection/edit-media-form"
import { useProfile } from "@/components/context/profile-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AddMoviePageProps {
  params: {
    id: string
  }
}

export default function UpdateMoviePage({ params }: AddMoviePageProps) {
  const { id } = params
  const { profile, loading } = useProfile()
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<any>();
//todo fix tags and dates
  useEffect(() => {
    if(!loading) {
      let movie = profile?.collection.find((movie: any) => movie.apiId === id);
      console.log("movie", movie)
      if(!movie) router.push(`/collection/movies/add/${id}`);
      setDefaultValues({
        apiId: id,
        title: movie.title,
        imageUrl: movie.imageUrl,
        overview: movie.overview === null ? undefined : movie.overview,
        timesWatched: movie.timesWatched,
        isFavorited: movie.isFavorited,
        isOwned: movie.isOwned,
        isWatching: movie.isWatching,
        plainTags: movie.tags.join(","),
        notes: movie.notes === null ? undefined : movie.notes,
        userRating: movie.userRating === null ? undefined : movie.userRating,
        releaseYear: movie.releaseYear === null ? undefined : movie.releaseYear,
        startedWatching: movie.startedWatching === null ? undefined : movie.startedWatching,
        completedWatching: movie.completedWatching === null ? undefined : movie.completedWatching,
        contentType: movie.contentType
      })
    }
  }, [loading, profile])

  if(loading || !defaultValues) {
    return <div>Loading...</div>
  }
  
//todo multiples arrays de fechas
  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditMovieForm action="update" mediaType="movie" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

