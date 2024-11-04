import DiscoverTabHeader from '@/components/shared/discover/DiscoverTabHeader';
import SearchResults from '@/components/shared/SearchResults';
import { getTMDBList } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";

const Discover = async ({ searchParams }: SearchParamProps) => {

  const { userId } = auth();
  if (!userId) redirect('/sign-in')

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const TMDB_API_KEY = process.env.TMDB_API_KEY;


  /* const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  } */
  const result = await getTMDBList('movies', searchQuery, page);//data.results.filter((movie: any) => movie.media_type === 'movie');
  const movies = result.results.filter((movie: any) => movie.media_type !== 'tv');

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <DiscoverTabHeader/>
      <SearchResults 
          movies={movies}
          totalPages={result.total_pages}
          page={page}
          userId={userId}
          contentType="movies"
        />
    </div>

  )
}

export default Discover
