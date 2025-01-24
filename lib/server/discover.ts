"use server"


export const getTMDBTrendingList = async (contentType: string, page: number) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const res = await fetch(
        `https://api.themoviedb.org/3/trending/${contentType}/week?api_key=${TMDB_API_KEY}&language=en-US&page=${page.toString()}`,
        { next: { revalidate: 10000 } }
    );
    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return data;

}

export const getTMDBTrailer = async (content: any) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/${content.media_type}/${content.id}/videos?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 10000 } }
    );
    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    console.log("data", data);

    const result = data.results.find((video: any) => video.type === 'Trailer');

    return result;

}

export const getBookList = async (searchQuery: string = '', page: number = 1) => {
    //TODO Add labguage support.Only working in English
    //const newQuery: string = searchQuery.trim().replace('', '+');

    const defaultTrendingBookEndpoints = [
        'https://www.googleapis.com/books/v1/volumes?q=subject:horror&langRestrict=en&orderBy=relevance&maxResults=20',
        'https://www.googleapis.com/books/v1/volumes?q=subject:comedy&langRestrict=en&orderBy=relevance&maxResults=20',
        'https://www.googleapis.com/books/v1/volumes?q=subject:romance&langRestrict=en&orderBy=relevance&maxResults=20',
        'https://www.googleapis.com/books/v1/volumes?q=subject:thriller&langRestrict=en&orderBy=relevance&maxResults=20',
        'https://www.googleapis.com/books/v1/volumes?q=subject:action&langRestrict=en&orderBy=relevance&maxResults=20',
        'https://www.googleapis.com/books/v1/volumes?q=subject:adventure&langRestrict=en&orderBy=relevance&maxResults=20',
    ]

    const randomEndpoint = defaultTrendingBookEndpoints[Math.round(Math.random() * defaultTrendingBookEndpoints.length)]

    if (searchQuery === '') {
        const res = await fetch(
            randomEndpoint,
            { next: { revalidate: 10000 } }
        );
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return data;

    } else {
        //const fetchUrlParam = type === "movies" ? "movie" : "tv";
        console.log("Inside else inm get book")
        const res = await fetch(

            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+intitle&maxResults=30`,//&maxResults=20
            { next: { revalidate: 10000 } }
        );
        const data = await res.json();
        console.log(searchQuery)
        console.log(data.items[0])
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return data;

    }

}

export const parseBookForDiscoveryCard = (book: any) => {
    const newBook = {
        id: book.id,
        bookId: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        imageUrl: book.volumeInfo.imageLinks.thumbnail
    }
}