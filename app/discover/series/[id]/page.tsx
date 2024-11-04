import { Button } from "@/components/ui/button";
import { addMovieToCollection } from "@/lib/actions/movieCollection.actions";
import Link from "next/link";

const Details = async ({ params }: any) => {

    const id = params.id;

    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 10000 } }
    );
    const movie = await res.json();
    if (!res.ok) {
        console.log(res)
        throw new Error('Failed to fetch data');
    }
    //const movie = data.results;
    const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;
    const newMovie = {
        tmdbId: movie.id,
        title: movie.title,
        rating: 3,
        imageUrl: imageUrl,
        categories: ['Anime'],
        comments: 'Good',
        flags: {
          "watched": false,
          "own": false,
          "watching": false,
          "plan to watch": false,
          "plan to buy": false
        }
    }

    console.log(movie)
    return (
        <div className="container mx-auto p-4 lg:grid lg:grid-cols-[25%_75%] content-center justify-center">
            <div className="flex flex-col m-4 p-4 content-center justify-center items-center">
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} width={200} height={300}/>
                <Link href={`/discover/movies/${id}/add`} className="my-4" /* onClick={(e:any) => addMovieToCollection(id, newMovie)} */> Add to list </Link>
            </div>
            <div className="content-center justify-center text-center">
                <h2 className="h2-bold">{movie.title}</h2>
                {movie.overview}
            </div>
        </div>
    )
}

export default Details

/**
 * TODO NEXT
 * 1. Funcion para añadir la pelicula a la bbdd (addMovieToCollection)
 * 2. Pantalla para añadirla con un form
 * 3. Configurar idioma
 */