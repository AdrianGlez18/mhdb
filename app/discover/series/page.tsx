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

  const result = await getTMDBList('series', searchQuery, page);
  const series = result.results.filter((movie: any) => movie.media_type !== 'movie');

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <DiscoverTabHeader/>
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