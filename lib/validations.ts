import { getMovieCollectionByUserId } from "./actions/movieCollection.actions";

export const checkIfWishlisted = async (userId: string, movieId: string) => {
    const movieCollection = await getMovieCollectionByUserId(userId);
    const isWishlisted = movieCollection.movies.some((movie : any) => movie.tmdbId === movieId && movie.flags["plan to watch"])
    return isWishlisted;
}