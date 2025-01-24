"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SortType } from "@/types/collection"

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onSort: (type: SortType) => void
  onTagsChange: (tags: string[]) => void
  availableTags: string[]
  selectedTags: string[]
}

export default function SearchAndFilter({
  onSearch,
  onSort,
  onTagsChange,
  availableTags,
  selectedTags,
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search your collection..." className="pl-9" onChange={(e) => onSearch(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Select onValueChange={(value) => onSort(value as SortType)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="date">Date Added</SelectItem>
          </SelectContent>
        </Select>

        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[140px] justify-between">
              {selectedTags.length > 0 ? <>Tags ({selectedTags.length})</> : "Tags"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {availableTags.map((tag) => (
                  <CommandItem
                    key={tag}
                    onSelect={() => {
                      const newTags = selectedTags.includes(tag)
                        ? selectedTags.filter((t) => t !== tag)
                        : [...selectedTags, tag]
                      onTagsChange(newTags)
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <span className="h-4 w-4 text-xs">✓</span>
                    </div>
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover> */}
      </div>
    </div>
  )
}

