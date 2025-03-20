import EditGameForm from "@/components/collection/edit-media-form"
import { getGameById } from "@/lib/server/discover"


interface AddGamePageProps {
  params: {
    id: string
  }
}

export default async function AddGamePage({ params }: AddGamePageProps) {
  const { id } = params
  const gameInfo = await getGameById(Number(id));
  console.log(gameInfo)
  
  const defaultValues = {
    apiId: id,
    title: gameInfo[0].name,
    imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo[0].cover.image_id}.jpg`,
    overview: gameInfo[0].summary,
    timesWatched: 0,
    isFavorited: false,
    isOwned: false,
    isWatching: false,
    tags: [],
    notes: "",
    userRating: 0,
    startedWatching: undefined,
    completedWatching: undefined,
    contentType: "game"
  } 

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
         <EditGameForm action="add" mediaType="game" defaultValues={defaultValues} /> 
      </div>
    </main>
  )
}

