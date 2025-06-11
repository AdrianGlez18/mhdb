import { Search } from "@/components/discover/shared/search";
import SearchResults from "@/components/discover/shared/search-results";
import PageUnderDevelopment from "@/components/shared/page-under-development"
import { getTrendingGames, getTwitchAccessToken, searchGameByTitle } from "@/lib/server/discover";

interface SearchParamProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DiscoverGamesPage = async ({ searchParams }: SearchParamProps) =>{
  /*const page = Number(searchParams?.page) || 0;
  const searchQuery = (searchParams?.query as string) || '';
  const token = await getTwitchAccessToken();
  const formatedQuery = searchQuery.split('%20').join(' ');
  const result = await searchGameByTitle(formatedQuery, token);
  
   return (
    <main className="w-full min-h-screen bg-background p-6">
      <Search contentType="game" />
      <SearchResults contentType="game" page={page} content={result} totalPages={10} />
    </main>
  ) */

  return (
    <main className="w-full min-h-screen bg-background p-6">
      <PageUnderDevelopment
        title="Discover Games Page is under maintenance"
        message="We're creating some cool features to interact and store games. Stay tuned!"
        design="[1%]"
        development="1/4"
        testing="[1%]"
      />
    </main>
  )
}

export default DiscoverGamesPage;
