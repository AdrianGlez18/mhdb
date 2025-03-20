import EditMovieForm from "@/components/collection/edit-media-form"
import { getCollectionItemById } from "@/lib/server/discover"
import { notFound } from "next/navigation"

interface AddMoviePageProps {
  params: {
    id: string
  }
}

export default async function UpdateMoviePage({ params }: AddMoviePageProps) {
  const { id } = params;
  const movie = await getCollectionItemById(id, "movie");

  if (!movie) {
    return notFound();
  }

  const defaultValues = {
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
    contentType: movie.contentType,
    watchLog: Array.isArray(movie.watchLog) ? movie.watchLog.map(({ startDate, endDate, ...rest }) => ({ startDate: startDate || undefined, endDate: endDate || undefined, ...rest })) : [],
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditMovieForm action="update" mediaType="movie" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

