import { getMovieCollectionByUserId } from "./actions/movieCollection.actions";
import translations from '@/data/translations.json'

export const checkIfWishlisted = async (userId: string, movieId: string) => {
    const movieCollection = await getMovieCollectionByUserId(userId);
    const isWishlisted = movieCollection.movies.some((movie : any) => movie.tmdbId === movieId && movie.isWishlisted)
    return isWishlisted;
}

export const checkIfListed = async (userId: string, movieId: string) => {
    const movieCollection = await getMovieCollectionByUserId(userId);
    const isListed = movieCollection.movies.some((movie : any) => movie.tmdbId === movieId /* && !movie.flags["plan to watch"] */)
    return isListed;
}

export const getTranslation = (id: keyof typeof translations, lang: 'es' | 'en' | 'fr') => {
    
    const result = translations[id!][lang] ?? 'Error: Text not found';
    return result;
}