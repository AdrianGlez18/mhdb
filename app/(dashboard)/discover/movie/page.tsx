import { Search } from "@/components/discover/shared/search"
import SearchResults from "@/components/discover/shared/search-results"
import PageUnderDevelopment from "@/components/shared/page-under-development"
import { getTMDBSearchResult } from "@/lib/server/discover";

interface SearchParamProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const DiscoverMoviePage = async ({ searchParams }: SearchParamProps) =>{
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  const result = await getTMDBSearchResult(searchQuery, 'movie', page);
  return (
    <main className="w-full min-h-screen bg-background p-6">
      <Search contentType="movie" />
      <SearchResults contentType="movie" page={page} content={result.results} totalPages={result.total_pages} />
    </main>
  )
}

export default DiscoverMoviePage