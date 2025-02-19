//"use client"

import Hero from "@/components/discover/shared/hero"
import DiscoverSection from "@/components/discover/shared/discover-section"
import { useContent } from "@/components/context/discover-context"
import { Skeleton } from "@/components/ui/skeleton"
import DiscoverBookSection from "@/components/discover/book/discover-book-section"
import { getBookList, getTMDBTrailer, getTMDBTrendingList } from "@/lib/server/discover"

export default async function Home() {

  //const { content, loading } = useContent();

  /* if (loading) {
    return (
      <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8 overflow-auto w-full">
        <div className="mx-auto max-w-7xl space-y-8">
          <Skeleton>
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-lg bg-slate-100 opacity-25" />
          </Skeleton>
        </div>
      </main>
    )
  } else {
    console.log(content);
  } */

  const responsePromise = getTMDBTrendingList('movie', 1);
  const responseTvPromise = getTMDBTrendingList('tv', 1);
  const responseBookPromise = getBookList();

  const [movieList, seriesList, bookList] = await Promise.all([responsePromise, responseTvPromise, responseBookPromise]);

  const firstMovie = movieList.results[0];

  const trailerData = await getTMDBTrailer(firstMovie);

  const trailer = {
    "id": firstMovie.id,
    "title": firstMovie.title,
    "key": trailerData?.key,
    "description": firstMovie.overview,
    "backdrop_path": firstMovie.backdrop_path
  }

  return (
    <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8 overflow-auto w-full">
      <div className="mx-auto max-w-7xl space-y-8">
        <Hero trailer={trailer} />

        <DiscoverSection
          title="Trending Movies"
          content={movieList.results}
          viewAllHref="/discover/movies"
        />

        <DiscoverSection
          title="Trending Series"
          content={seriesList.results}
          viewAllHref="/discover/series"
        />

        <DiscoverBookSection
          title="Some interesting books"
          content={bookList.items}
          viewAllHref="/discover/book"
        />

        {/* <DiscoverSection
          title="Recommended for You"
          content={recommendedMovies}
          viewAllHref="/movies/recommended"
        />  */}
      </div>
    </main>
  )
}

