export type MediaType = "movie" | "book" | "game" | "series" | "all"
export type CollectionType = "collection" | "wishlist"
export type SortType = "rating" | "alphabetical" | "date"

/* export interface CollectionItem {
  id: string
  title: string
  imageUrl: string
  type: Exclude<MediaType, "all">
  rating: number
  addedDate: string
  tags: string[]
} */

  export interface CollectionItem {
    id: string
    apIId: string
    title: string
    imageUrl: string
    type: Exclude<MediaType, "all">
    rating: number
    addedDate: string
    tags: string[]
  }
