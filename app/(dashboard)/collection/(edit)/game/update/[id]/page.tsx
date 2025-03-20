import EditMovieForm from "@/components/collection/edit-media-form"
import { getCollectionItemById } from "@/lib/server/discover"
import { notFound } from "next/navigation"

interface AddGamePageProps {
  params: {
    id: string
  }
}

export default async function UpdateGamePage({ params }: AddGamePageProps) {
  const { id } = params;
  const game = await getCollectionItemById(id, "game");

  if (!game) {
    return notFound();
  }

  const defaultValues = {
    apiId: id,
    title: game.title,
    imageUrl: game.imageUrl,
    overview: game.overview === null ? undefined : game.overview,
    timesWatched: game.timesWatched,
    isFavorited: game.isFavorited,
    isOwned: game.isOwned,
    isWatching: game.isWatching,
    plainTags: game.tags.join(","),
    notes: game.notes === null ? undefined : game.notes,
    userRating: game.userRating === null ? undefined : game.userRating,
    releaseYear: game.releaseYear === null ? undefined : game.releaseYear,
    contentType: game.contentType,
    watchLog: Array.isArray(game.watchLog) ? game.watchLog.map(({ startDate, endDate, ...rest }) => ({ startDate: startDate || undefined, endDate: endDate || undefined, ...rest })) : [],
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditMovieForm action="update" mediaType="game" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

