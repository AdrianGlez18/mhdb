import DiscoverTabHeader from '@/components/shared/discover/DiscoverTabHeader';
import SearchResults from '@/components/shared/discover/books/SearchResults';
import { getBookList, getTMDBList } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";

const Discover = async ({ searchParams }: SearchParamProps) => {

  const { userId } = auth();
  if (!userId) redirect('/sign-in')

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const result = await getBookList(searchQuery, page);//data.results.filter((movie: any) => movie.media_type === 'movie');

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <DiscoverTabHeader />
       <SearchResults 
          movies={result.items}
          totalPages={1}
          page={page}
          userId={userId}
          contentType="books"
        /> 
      {/* <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {
        result.items.map((item: any) => {
          console.log(item.volumeInfo.imageLinks)
          if (typeof item.volumeInfo.imageLinks !== 'undefined') {
            return (
              <div className='col-span-1'>
                
                <img src={item.volumeInfo.imageLinks.thumbnail} width={200} height={300} />
                <p>{item.volumeInfo.title}</p>
              </div>
            )
          }

        })
      }
      </div> */}
    </div>

  )
}

export default Discover
