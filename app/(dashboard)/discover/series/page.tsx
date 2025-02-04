import SearchResults from "@/components/discover/shared/search-results";
import { getTMDBSearchResult } from "@/lib/server/discover";
import { Search } from "@/components/discover/shared/search";

interface SearchParamProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DiscoverSeriesPage = async ({ searchParams }: SearchParamProps) =>{
const page = Number(searchParams?.page) || 1;
const searchQuery = (searchParams?.query as string) || '';
const result = await getTMDBSearchResult(searchQuery, 'series', page);
return (
  <main className="w-full min-h-screen bg-background p-6">
    <Search contentType="series" />
    <SearchResults contentType="series" page={page} content={result.results} totalPages={result.total_pages} />
  </main>
)
}

export default DiscoverSeriesPage