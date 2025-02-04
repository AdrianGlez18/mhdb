import EditMovieForm from "@/components/collection/edit-media-form"


interface AddMoviePageProps {
  params: {
    id: string
  }
}

export default async function AddMoviePage({ params }: AddMoviePageProps) {
  const { id } = params
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
  const movieInfo = await response.json()
  console.log("info: ", movieInfo)
  
  const defaultValues = {
    apiId: id,
    title: movieInfo.title || movieInfo.name,
    imageUrl: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieInfo.poster_path}`,
    overview: movieInfo.overview,
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
    contentType: "movie"
  }

//todo multiples arrays de fechas


  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditMovieForm action="add" mediaType="movie" defaultValues={defaultValues} />
      </div>
    </main>
  )
}

