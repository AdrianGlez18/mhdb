import type { CollectionItem } from '@prisma/client'
import CollectionCard from "./collection-card"

interface CollectionGridProps {
  items: CollectionItem[]
}

export default function CollectionGrid({ items }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <CollectionCard key={item.id} item={item} />
      ))}
    </div>
  )
}

