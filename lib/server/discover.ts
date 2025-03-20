"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "./db";
import { createClient } from "../supabase/server";
import { ContentType } from "@prisma/client";
//todo Intentar usarlo en collection

export const getUserId = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return undefined;
  }

  const userId = user.id;
  return userId;
});

export const getUserProfile = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return undefined;
  }

  const userId = user.id;

  const profile = await db.profile.findFirst({
    where: {
      userId,
    },
  });

  if (!profile || !profile.id) {
    return undefined;
  }

  return profile;
});

export const getUsername = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return {
      error: "Unauthorized",
    };
  }

  const userId = user.id;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile || !profile.username) {
    return {
      error: "Profile not found",
    };
  }

  return {
    data: profile.username,
  };
});

export const getCollection = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return [];
  }

  const userId = user.id;

  const collection = await db.collectionItem.findMany({
    include: {
      watchLog: true,
    },
    where: {
      userId,
    },
  });

  if (!collection) {
    return [];
  }

  return collection;
});

export const getWishlist = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return [];
  }

  const userId = user.id;

  const wishlist = await db.wishlistItem.findMany({
    where: {
      userId,
    },
  });

  if (!wishlist) {
    return [];
  }

  return wishlist;
});

export const getCollectionItemById = cache(
  async (id: string, contentType: ContentType) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
      return undefined;
    }

    const userId = user.id;

    const collection = await db.collectionItem.findUnique({
      where: {
        unique_content_for_user: {
          apiId: id,
          userId,
          contentType,
        },
      },
      include: {
        watchLog: true,
      },
    });

    if (!collection || !collection.id) {
      return undefined;
    }

    return collection;
  }
);

export const getIfFollowing = async (
  followerId: string,
  followedId: string
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return false;
  }

  const userId = user.id;

  const result = await db.following.findFirst({
    where: {
      followerId,
      followedId,
    },
  });

  if (!result) return false;

  return true;
};

export const findUserProfileByUsername = cache(async (username: string) => {
  if (!username) {
    return {
      error: "No username provided",
    };
  }

  const profile = await db.profile.findUnique({
    where: {
      username,
    },
    include: {
      user: {
        include: {
          collection: true,
          reviews: true,
        },
      },
      following: true,
      followers: true,
    },
  });

  if (!profile) {
    return {
      error: "Profile not found",
    };
  }

  console.log("Reviews: ", profile.user.reviews);

  if (profile && profile.isPublic) {
    const favoriteItems = profile.user.collection.filter(
      (item) => item.isFavorited
    );
    return {
      id: profile.id,
      isPublic: profile.isPublic,
      username: profile.username,
      profileImg: profile.imageUrl,
      collection: favoriteItems,
      following: profile.following,
      followers: profile.followers,
      reviews: profile.user.reviews,
    };
  } else if (profile && !profile.isPublic) {
    return {
      id: profile.id,
      isPublic: profile.isPublic,
      username: profile.username,
      profileImg: profile.imageUrl,
      followingCount: profile.following.length,
      followersCount: profile.followers.length,
    };
  }

  return {
    error: "Unknown database error",
  };
});

export const getTMDBTrendingList = cache(
  async (contentType: string, page: number) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${contentType}/week?api_key=${TMDB_API_KEY}&language=en-US&page=${
        page /* .toString() */
      }`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data;
  }
);

export const getTMDBSearchResult = cache(
  async (query: string, contentType: string, page: number) => {
    //TODO Add labguage support
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const fetchUrlParam = contentType === "series" ? "tv" : "movie";

    if (query === "") {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/${fetchUrlParam}/week?api_key=${TMDB_API_KEY}&language=en-US&page=${
          page /* .toString() */
        }`,
        { next: { revalidate: 0 } }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return data;
    } else {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${fetchUrlParam}?query=${query}&api_key=${TMDB_API_KEY}&language=en-US&page=${
          page /* .toString() */
        }`,
        { next: { revalidate: 0 } }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return data;
    }
    return [];
  }
);

export const getTMDBTrailer = cache(async (content: any) => {
  //TODO Add labguage support
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/${content.media_type}/${content.id}/videos?api_key=${TMDB_API_KEY}`,
    { next: { revalidate: 0 } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = data.results.find((video: any) => video.type === "Trailer");

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
    throw new Error("Failed to fetch data");
  }

  return data;
});

export const getBookDetails = cache(async (id: string) => {
  //TODO Add labguage support

  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
});

export const getBookList = cache(
  async (searchQuery: string = "", page: number = 1) => {
    //TODO Add labguage support.Only working in English
    //const newQuery: string = searchQuery.trim().replace('', '+');

    const defaultTrendingBookEndpoints = [
      "https://www.googleapis.com/books/v1/volumes?q=subject:horror&langRestrict=en&orderBy=relevance&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=subject:comedy&langRestrict=en&orderBy=relevance&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=subject:romance&langRestrict=en&orderBy=relevance&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=subject:thriller&langRestrict=en&orderBy=relevance&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=subject:action&langRestrict=en&orderBy=relevance&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=subject:adventure&langRestrict=en&orderBy=relevance&maxResults=20",
    ];

    const randomEndpoint =
      defaultTrendingBookEndpoints[
        Math.round(Math.random() * (defaultTrendingBookEndpoints.length - 1))
      ];

    if (searchQuery === "") {
      const res = await fetch(randomEndpoint, { next: { revalidate: 0 } });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return data;
    } else {
      //todo fix precision de la busqueda Y al añadir desde aqui
      const startIndex = page * 20; /* .toString(); */
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=20&startIndex=${startIndex}`, //&maxResults=20
        { next: { revalidate: 0 } }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return data;
    }
  }
);

export const getTwitchAccessToken = /* cache( */ async () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId!,
      client_secret: clientSecret!,
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();
  return data.access_token;
}; /* ) */

export const getTrendingGames = cache(async (token: string) => {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `
        fields name, cover.*, rating;
        sort rating desc;
        limit 20;
      `,
  });
  return response.json();
});

export const searchGameByTitle = cache(async (title: string, token: string) => {
  console.log(token);

  if (!title || title == "") {
    const games = getTrendingGames(token);
    return games;
  }

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `
        fields name, summary, cover.*, first_release_date, genres.name, platforms.name;
        search "${title}";
  where category = 0 & version_parent = null;
  limit 20;
      `,
  });
  return response.json();
});

export const getGameById = cache(async (id: number) => {
  const token = await getTwitchAccessToken();
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `
      fields name, summary, cover.*, first_release_date, genres.name, platforms.name;
      where id = ${id};
    `,
  });
  return response.json();
});

export const getIfItemIsInCollection = cache(
  async (apiId: string, contentType: ContentType) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) {
      return false;
    }

    const userId = user.id;

    const collectionItem = await db.collectionItem.findUnique({
      where: {
        unique_content_for_user: {
          apiId,
          userId,
          contentType,
        },
      },
    });

    return !!collectionItem;
  }
);
