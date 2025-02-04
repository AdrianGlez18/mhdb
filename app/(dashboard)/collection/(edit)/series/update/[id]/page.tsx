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

export default function UpdateSeriesPage({ params }: AddMoviePageProps) {
  const { id } = params
  const { profile, loading } = useProfile()
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<any>();

  useEffect(() => {
    if(!loading) {
      let series = profile?.collection.find((serie: any) => serie.apiId === id);
      console.log("series", series)
      if(!series) router.push(`/collection/series/add/${id}`);
      setDefaultValues({
        apiId: id,
        title: series.title,
        imageUrl: series.imageUrl,
        overview: series.overview === null ? undefined : series.overview,
        timesWatched: series.timesWatched,
        isFavorited: series.isFavorited,
        isOwned: series.isOwned,
        isWatching: series.isWatching,
        plainTags: series.tags.join(","),
        notes: series.notes === null ? undefined : series.notes,
        userRating: series.userRating === null ? undefined : series.userRating,
        releaseYear: series.releaseYear === null ? undefined : series.releaseYear,
        startedWatching: series.startedWatching === null ? undefined : series.startedWatching,
        completedWatching: series.completedWatching === null ? undefined : series.completedWatching,
        contentType: series.contentType
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
        <EditMovieForm action="update" mediaType="series" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

