import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import { getMovieCollectionByUserId } from '@/lib/actions/movieCollection.actions';
import { MovieInterface } from '@/lib/database/models/movieCollection.model';
import { auth } from '@clerk/nextjs';

const Discover = async () => {
  //const pathname = usePathname();
  //const { userId } = auth();

  //if (!userId) redirect("/sign-in");

  //const movieCollection = await getMovieCollectionByUserId(userId);

  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const movies = data.results;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4 overflow-x-hidden content-center justify-center">
      {
        movies.map((movie: any) => {
          if(movie.media_type === 'tv') {
            return (
              <div className="flex flex-col m-4 p-4" key={movie.name}>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} width={200} height={300} />
                <p>{movie.name}</p>
              </div>
            )
          }
        })
      }
    </div>

  )
}

export default Discover