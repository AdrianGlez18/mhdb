import Header from '@/components/shared/Header'
import SearchResults from '@/components/shared/SearchResults';
import Sidebar from '@/components/shared/Sidebar'
import { getMovieCollectionByUserId } from '@/lib/actions/movieCollection.actions';
import { MovieInterface } from '@/lib/database/models/movieCollection.model';
import { getTMDBList } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";

const Discover = async ({ searchParams }: SearchParamProps) => {

  const { userId } = auth();
  if (!userId) redirect('/sign-in')

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const result = await getTMDBList('series', searchQuery, page);
  const series = result.results.filter((movie: any) => movie.media_type !== 'movie');
  console.log("START #########################################################")

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <SearchResults 
          movies={series}
          totalPages={result.total_pages}
          page={page}
          userId={userId}
          contentType="series"
        />
    </div>
  )
}

export default Discover