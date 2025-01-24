"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MediaTypeFilter from "@/components/collection/media-type-filter"
import CollectionGrid from "@/components/collection/collection-grid"
import SearchAndFilter from "@/components/collection/search-filter"
import type { MediaType, CollectionType, CollectionItem, SortType } from "@/types/collection"
import { useProfile } from "@/components/context/profile-context"


export default function CollectionPage() {
  const { profile, loading } = useProfile()
  const [selectedType, setSelectedType] = useState<MediaType>("all")
  const [selectedCollection, setSelectedCollection] = useState<CollectionType>("collection")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags
  const allTags = useMemo(() => {
    if (!profile) return []
    return Array.from(
      new Set([...(profile.collection || []), ...(profile.wishlist || [])].flatMap((item) => item.tags)), //todo quitar wishlist si al final no le añaden tags
    ).sort()
  }, [profile])

  const collection = useMemo(() => {
    if (!profile) return []
    return selectedCollection === "collection" ? profile.collection : profile.wishlist
  }, [profile, selectedCollection])

  const filteredItems = useMemo(() => {
    if(loading || !collection) return []
    return collection
      .filter((item:any) => {
        // Filter by media type
        if (selectedType !== "all" && item.contentType !== selectedType) return false

        // Filter by search query
        if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

        // Filter by tags
        if (selectedTags.length > 0 && !selectedTags.every((tag) => item.tags.includes(tag))) return false

        return true
      })
      .sort((a:any, b:any) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating
          case "alphabetical":
            return a.title.localeCompare(b.title)
          case "date":
            return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
          default:
            return 0
        }
      })
  }, [collection, selectedType, searchQuery, selectedTags, sortBy])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </main>
    )
  }

  return (
    <main className="space-y-8 px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">My Collection</h1>
            <MediaTypeFilter selected={selectedType} onChange={setSelectedType} />
          </div>

          <SearchAndFilter
            onSearch={setSearchQuery}
            onSort={setSortBy}
            onTagsChange={setSelectedTags}
            availableTags={allTags}
            selectedTags={selectedTags}
          />
        </div>

        <Tabs value={selectedCollection} onValueChange={(v) => setSelectedCollection(v as CollectionType)}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="collection" className="flex-1 sm:flex-none">
              Collection ({profile?.collection.length ?? 0})
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex-1 sm:flex-none">
              Wishlist ({profile?.wishlist.length ?? 0})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="collection" className="mt-6">
            {filteredItems.length > 0 ? (
              <CollectionGrid items={filteredItems} />
            ) : (
              <p className="text-center text-muted-foreground">No items found matching your criteria.</p>
            )}
          </TabsContent>
          <TabsContent value="wishlist" className="mt-6">
            {filteredItems.length > 0 ? (
              <CollectionGrid items={filteredItems} />
            ) : (
              <p className="text-center text-muted-foreground">No items found matching your criteria.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

