import { Search } from "@/components/discover/shared/search"
import SearchResults from "@/components/discover/shared/search-results"
import PageUnderDevelopment from "@/components/shared/page-under-development"
import { getBookList, getTMDBSearchResult } from "@/lib/server/discover";

interface SearchParamProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const DiscoverBooksPage = async ({ searchParams }: SearchParamProps) =>{
  const page = Number(searchParams?.page) || 0;
  const searchQuery = (searchParams?.query as string) || '';
  const result = await getBookList(searchQuery, page);
  return (
    <main className="w-full min-h-screen bg-background p-6">
      <Search contentType="book" />
      <SearchResults contentType="book" page={page} content={result.items} totalPages={result.totalItems/20} />
    </main>
  )
}

export default DiscoverBooksPage