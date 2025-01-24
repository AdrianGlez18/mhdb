"use client"

import { Film, BookOpen, Gamepad2, LayoutGrid, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MediaType } from "@/types/collection"

interface MediaTypeFilterProps {
  selected: MediaType
  onChange: (type: MediaType) => void
}

export default function MediaTypeFilter({ selected, onChange }: MediaTypeFilterProps) {
  return (
    <div className="inline-flex rounded-lg border p-1 bg-muted/30">
      <Button
        variant={selected === "all" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onChange("all")}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">All</span>
      </Button>
      <Button
        variant={selected === "movie" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onChange("movie")}
      >
        <Film className="h-4 w-4" />
        <span className="hidden sm:inline">Movies</span>
      </Button>
      <Button
        variant={selected === "series" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onChange("series")}
      >
        <Tv className="h-4 w-4" />
        <span className="hidden sm:inline">Series</span>
      </Button>
      <Button
        variant={selected === "book" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onChange("book")}
      >
        <BookOpen className="h-4 w-4" />
        <span className="hidden sm:inline">Books</span>
      </Button>
      <Button
        variant={selected === "game" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onChange("game")}
      >
        <Gamepad2 className="h-4 w-4" />
        <span className="hidden sm:inline">Games</span>
      </Button>
    </div>
  )
}

