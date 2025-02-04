"use client"

import EditBookForm from "@/components/collection/edit-media-form"
import { useProfile } from "@/components/context/profile-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AddBookPageProps {
  params: {
    id: string
  }
}

export default function UpdateBookPage({ params }: AddBookPageProps) {
  const { id } = params
  const { profile, loading } = useProfile()
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<any>();
//todo fix tags and dates
  useEffect(() => {
    if(!loading) {
      let book = profile?.collection.find((book: any) => book.apiId === id);
      if(!book) router.push(`/collection/book/add/${id}`);
      setDefaultValues({
        apiId: id,
        title: book.title,
        imageUrl: book.imageUrl,
        author: book.author === null ? undefined : book.author,
        overview: book.overview === null ? undefined : book.overview,
        timesWatched: book.timesWatched,
        isFavorited: book.isFavorited,
        isOwned: book.isOwned,
        isWatching: book.isWatching,
        plainTags: book.tags.join(","),
        notes: book.notes === null ? undefined : book.notes,
        userRating: book.userRating === null ? undefined : book.userRating,
        releaseYear: book.releaseYear === null ? undefined : book.releaseYear,
        startedWatching: book.startedWatching === null ? undefined : book.startedWatching,
        completedWatching: book.completedWatching === null ? undefined : book.completedWatching,
        contentType: book.contentType
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
        <EditBookForm action="update" mediaType="book" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

