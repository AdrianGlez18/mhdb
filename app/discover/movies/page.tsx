import CollectionCard from '@/components/shared/CollectionCard';
import Header from '@/components/shared/Header'
import { Search } from '@/components/shared/Search';
import SearchResults from '@/components/shared/SearchResults';
import Sidebar from '@/components/shared/Sidebar'
import { getMovieCollectionByUserId } from '@/lib/actions/movieCollection.actions';
import { MovieInterface } from '@/lib/database/models/movieCollection.model';
import { getTMDBList } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { stringify } from 'querystring';
import { useState } from 'react';

const Discover = async ({ searchParams }: SearchParamProps) => {
  //const pathname = usePathname();
  const { userId } = auth();
  //const [movies, setMovies] = useState([])

  //const searchParams = useSearchParams()
 
  //const search = searchParams.get('search')

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
  console.log("#########################################################################")
  console.log(result)
  const movies = result.results.filter((movie: any) => movie.media_type !== 'tv');
  console.log("#########################################################################")
  console.log(movies)
  console.log("#########################################################################")
  //setMovies(data.results.filter((movie: any) => movie.media_type === 'movie'))

  let id: string = '';
  let title: string = '';
  let rating = '0';

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <SearchResults 
          movies={movies}
          totalPages={result.total_pages}
          page={page}
          userId={userId}
        />
      {/* <Search movies={movies} setMovies={null}/> */}
      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 max-w-6xl mx-auto py-4 overflow-x-hidden content-center justify-center">
        {
          movies.slice(0, 9).map((movie: any) => {
            id = movie.id.toString();
            title = movie.title;
            rating = (Math.round(movie.vote_average * 10) / 10).toString()
            if (movie.media_type === 'movie') {
              return (
                <CollectionCard userId={userId!} id={id} title={title} img={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} rank={rating} />
              )
            }
          })
        }
      </div> */}
    </div>

  )
}

export default Discover
