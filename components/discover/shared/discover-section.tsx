

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DiscoverCard from "@/components/discover/shared/discover-card"
import type { DiscoverMovie } from "@/types"

interface DiscoverSectionProps {
  title: string
  content: (DiscoverMovie /* | null */)[]
  viewAllHref: string
}

export default function DiscoverSection({ title, content, viewAllHref }: DiscoverSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Button variant="ghost" className="font-medium" asChild>
          <a href={viewAllHref}>View all</a>
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex w-max space-x-4 p-1">
          {content.map((item) => (
            <div key={item.id} className="w-[200px]">
              <DiscoverCard content={item} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

