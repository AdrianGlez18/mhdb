"use client";

import type { CollectionItem, WishlistItem } from "@prisma/client";
import CollectionCard from "./collection-card";
import MediaTypeFilter from "./media-type-filter";
import SearchAndFilter from "./search-filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useMemo, useState } from "react";
import { CollectionType, MediaType, SortType } from "@/types/collection";
import page from "@/app/page";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

interface CollectionGridProps {
  collection: CollectionItem[];
  wishlist: WishlistItem[];
}

export default function CollectionGrid({
  collection,
  wishlist,
}: CollectionGridProps) {
  const [selectedType, setSelectedType] = useState<MediaType>("all");
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType>("collection");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("date");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 25;

  const currentData = useMemo(() => {
    return selectedCollection === "collection" ? collection : wishlist;
  }, [selectedCollection, collection, wishlist]);

  const allTags = useMemo(() => {
    return Array.from(
      new Set([...collection].flatMap((item) => item.tags)) //todo quitar wishlist si al final no le añaden tags
    ).sort();
  }, [collection]);

  const filteredItems = useMemo(() => {
    const filteredData = currentData
      .filter((item: any) => {
        // Filter by media type
        if (selectedType !== "all" && item.contentType !== selectedType)
          return false;

        // Filter by search query
        if (
          searchQuery &&
          !item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;

        // Filter by tags
        if (
          selectedTags.length > 0 &&
          !selectedTags.every((tag) => item.tags?.includes(tag))
        )
          return false;

        return true;
      })
      .sort((a: any, b: any) => {
        switch (sortBy) {
          case "rating":
            return b.userRating - a.userRating;
          case "alphabetical":
            return a.title.localeCompare(b.title);
          case "date":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          default:
            return 0;
        }
      });

    const newTotalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    setTotalPages(newTotalPages);
    
    if (page > newTotalPages) {
      setPage(1);
    }

    return filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [
    currentData,
    selectedType,
    searchQuery,
    selectedTags,
    sortBy,
    page,
  ]);

  return (
    <main className="space-y-8 px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">My Collection</h1>
            <MediaTypeFilter
              selected={selectedType}
              onChange={setSelectedType}
            />
          </div>

          <SearchAndFilter
            onSearch={setSearchQuery}
            onSort={setSortBy}
            onTagsChange={setSelectedTags}
            availableTags={allTags ?? []}
            selectedTags={selectedTags}
          />
        </div>

        <Tabs
          value={selectedCollection}
          onValueChange={(v) => setSelectedCollection(v as CollectionType)}
        >
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="collection" className="flex-1 sm:flex-none">
              Collection ({collection.length ?? 0})
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex-1 sm:flex-none">
              Wishlist ({wishlist.length ?? 0})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="collection" className="mt-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredItems.map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No items found matching your criteria.
              </p>
            )}
          </TabsContent>
          <TabsContent value="wishlist" className="mt-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredItems.map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No items found matching your criteria.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="max-w-6xl mx-auto content-center justify-center">
        {totalPages > 1 && (
          <Pagination className="my-10">
            <PaginationContent className="flex w-full">
              <Button disabled={Number(page) <= 1}>
                <PaginationPrevious
                  className="hover:bg-transparent hover:text-white"
                  onClick={() => setPage(Number(page) - 1)}
                />
              </Button>

              <p className="text-center p-16-medium w-fit flex-1">
                {page} / {totalPages}
              </p>

              <Button disabled={Number(page) >= totalPages}>
                <PaginationNext
                  className="hover:bg-transparent hover:text-white"
                  onClick={() => setPage(Number(page) + 1)}
                />
              </Button>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
}
