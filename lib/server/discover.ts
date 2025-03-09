"use server"

import { cookies } from "next/headers";
import { cache } from "react";


export const getTMDBTrendingList = cache(async (contentType: string, page: number) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const res = await fetch(
        `https://api.themoviedb.org/3/trending/${contentType}/week?api_key=${TMDB_API_KEY}&language=en-US&page=${page/* .toString() */}`,
        { next: { revalidate: 0 } }
    );
    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return data;
});

export const getTMDBSearchResult = cache(async (query: string, contentType: string, page: number) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const fetchUrlParam = contentType === "series" ? "tv" : "movie";

    if (query === '') {
        const res = await fetch(
            `https://api.themoviedb.org/3/trending/${fetchUrlParam}/week?api_key=${TMDB_API_KEY}&language=en-US&page=${page/* .toString() */}`,
            { next: { revalidate: 0 } }
        );
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return data;
    } else {
        
        const res = await fetch(
        
            `https://api.themoviedb.org/3/search/${fetchUrlParam}?query=${query}&api_key=${TMDB_API_KEY}&language=en-US&page=${page/* .toString() */}`,
            { next: { revalidate: 0 } }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return data;
    }
    return [];
});

export const getTMDBTrailer = cache(async (content: any) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/${content.media_type}/${content.id}/videos?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 0 } }
    );
    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const result = data.results.find((video: any) => video.type === 'Trailer');

    return result;
});

export const getTMDBDetails = cache(async (id: string, contentType: string) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const res = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`,
        { next: { revalidate: 0 } }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return data;
});

export const getBookDetails = cache(async (id: string) => {
    //TODO Add labguage support

    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`,
        { next: { revalidate: 0 } }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return data;
});

export const getBookList = cache(async (searchQuery: string = '', page: number = 1) => {
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

    const randomEndpoint = defaultTrendingBookEndpoints[Math.round(Math.random() * (defaultTrendingBookEndpoints.length - 1))]

    if (searchQuery === '') {
        const res = await fetch(
            randomEndpoint,
            { next: { revalidate: 0 } }
        );
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return data;

    } else {
        //todo fix precision de la busqueda Y al añadir desde aqui
        const startIndex = (page * 20 )/* .toString(); */
        const res = await fetch(

            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=20&startIndex=${startIndex}`,//&maxResults=20
            { next: { revalidate: 0 } }
        );
        const data = await res.json();

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return data;

    }

});

export async function getTwitchAccessToken() {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'client_credentials',
      }),
    });
  
    const data = await response.json();
    return data.access_token;
  }

  export async function setTwitchAccessToken(token: string) {
    cookies().set('igdb_access_token', token, { secure: true, httpOnly: true, maxAge: 60 * 60 * 24 }); //Expires every day
  }
  
  export async function getTwitchAccessTokenFromStorage() {
    return cookies().get('igdb_access_token')?.value;
  }

  export async function ensureTwitchAccessToken() {
    let token = await getTwitchAccessTokenFromStorage();
    if (!token) {
      token = await getTwitchAccessToken();
      await setTwitchAccessToken(token!);
    }
    return token;
  }
  
  export async function getTrendingGames(token: string) {
    //const token = await ensureTwitchAccessToken();
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: `
        fields name, cover.*, rating;
        sort rating desc;
        limit 20;
      `,
    });
    return response.json();
  }
  
  export async function searchGameByTitle(title: string) {
    const token = await ensureTwitchAccessToken();
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: `
        fields name, cover.url, thumb.url;
        search "${title}";
        limit 10;
      `,
    });
    return response.json();
  }

export async function getGameById(id: number) {
  const token = await getTwitchAccessToken();
  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID!,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: `
      fields name, summary, cover.*, first_release_date, genres.name, platforms.name;
      where id = ${id};
    `,
  });
  return response.json();
}