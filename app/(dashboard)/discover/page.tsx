"use client"

import Hero from "@/components/discover/shared/hero"
import DiscoverSection from "@/components/discover/shared/discover-section"
import { useContent } from "@/components/context/discover-context"
import { Skeleton } from "@/components/ui/skeleton"
import DiscoverBookSection from "@/components/discover/book/discover-book-section"

export default function Home() {

  const { content, loading } = useContent();

  if (loading) {
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
  }

  return (
    <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8 overflow-auto w-full">
      <div className="mx-auto max-w-7xl space-y-8">
        <Hero trailer={content.trailer} />

        <DiscoverSection
          title="Trending Movies"
          content={content.movies}
          viewAllHref="/discover/movies"
        />

        <DiscoverSection
          title="Trending Series"
          content={content.series}
          viewAllHref="/discover/series"
        />

        <DiscoverBookSection
          title="Some interesting books"
          content={content.books}
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

