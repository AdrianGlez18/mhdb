import EditMovieForm from "@/components/collection/edit-media-form"
import { getCollectionItemById } from "@/lib/server/discover"
import { notFound } from "next/navigation"

interface AddBookPageProps {
  params: {
    id: string
  }
}

export default async function UpdateBookPage({ params }: AddBookPageProps) {
  const { id } = params;
  const book = await getCollectionItemById(id, "book");

  if (!book) {
    return notFound();
  }

  const defaultValues = {
    apiId: id,
    title: book.title,
    imageUrl: book.imageUrl,
    overview: book.overview === null ? undefined : book.overview,
    timesWatched: book.timesWatched,
    isFavorited: book.isFavorited,
    isOwned: book.isOwned,
    isWatching: book.isWatching,
    plainTags: book.tags.join(","),
    notes: book.notes === null ? undefined : book.notes,
    userRating: book.userRating === null ? undefined : book.userRating,
    releaseYear: book.releaseYear === null ? undefined : book.releaseYear,
    contentType: book.contentType,
    watchLog: Array.isArray(book.watchLog) ? book.watchLog.map(({ startDate, endDate, ...rest }) => ({ startDate: startDate || undefined, endDate: endDate || undefined, ...rest })) : [],
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditMovieForm action="update" mediaType="book" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

