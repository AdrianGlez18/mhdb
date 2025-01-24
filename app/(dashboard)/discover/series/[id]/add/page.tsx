import EditSeriesForm from "@/components/collection/edit-media-form"

interface AddSeriesPageProps {
  params: {
    id: string
  }
}

export default async function AddSeriesPage({ params }: AddSeriesPageProps) {
  const { id } = params
  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
  const seriesInfo = await response.json()
  
  const defaultValues = {
    apiId: id,
    title: seriesInfo.title || seriesInfo.name,
    imageUrl: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${seriesInfo.poster_path}`,
    overview: seriesInfo.overview,
    timesWatched: 0,
    isFavorited: false,
    isOwned: false,
    isWatching: false,
    tags: [],
    notes: "",
    userRating: 0,
    releaseYear: undefined,
    startedWatching: undefined,
    completedWatching: undefined,
    contentType: "series"
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditSeriesForm action="add" mediaType="series" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

