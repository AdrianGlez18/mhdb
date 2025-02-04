/* export interface CrewMember {
  id: string
  name: string
  role: string
  imageUrl?: string
} */

export interface CollectionMovie {
  id: string
  tmdbId: string
  title?: string
  name?: string
  imageUrl?: string
  releaseYear?: number
  timesWatched: number

  isWatching: boolean
  isFavorited: boolean
  isOwned: boolean
  tags: string[]
  notes?: string
  userRating?: number
}



export interface DiscoverMovie {
  id: string
  title?: string
  name?: string
  backdrop_path?: string
  genre_ids?: number[]
  media_type?: string
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  release_date?: string
  vote_average?: number
  vote_count?: number
  video?: boolean
  adult?: boolean
  poster_path?: string
  first_air_date?: string
  origin_country?: string[]
  original_name?: string
}

export interface Book {
  id: string
  bookId: string
  title: string
  author?: string
  imageUrl: string
  isReading: boolean
  isRead: boolean
  isFavorited: boolean
  isOwned: boolean
  tags: string[]
  timesRead?: number
  notes?: string
  cost?: number
  userRating?: number
  synopsis?: string
  edition?: string
  createdAt?: string
  updatedAt?: string
}

export interface ProfileContentItem {
  id: string
  title: string
  imageUrl: string
  userRating: number
  contentType: "movie" | "series" | "book" | "game"
}


export type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};