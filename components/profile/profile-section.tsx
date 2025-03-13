

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DiscoverCard from "@/components/discover/shared/discover-card"
import type { DiscoverMovie, ProfileContentItem } from "@/types"
import { ContentType } from "@prisma/client"
import ProfileCard from "./profile-card"

interface DiscoverSectionProps {
  title: string
  content: (ProfileContentItem /* | null */)[]
  contentType: ContentType
}

export default function ProfileSection({ title, content, contentType }: DiscoverSectionProps) {
  const sortedContent = content.sort((a, b) => b.userRating - a.userRating);
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex w-max space-x-4 p-1">
          {sortedContent.slice(0, 10).map((item) => (
            <div key={item.id} className="w-[200px]">
              <ProfileCard item={item} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

