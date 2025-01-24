"use client"

import { Star, Film, Tv, BookOpen, Gamepad2 } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { CollectionItem } from "@prisma/client"
import { Badge } from "@/components/ui/badge"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const CollectionCard = ({ item }: { item: CollectionItem }) => {
    const router = useRouter()
    return (
        <Card className="group overflow-hidden">
            <div className="aspect-[2/3] relative overflow-hidden">
                <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2 flex items-center justify-center gap-1 rounded-full bg-background/80 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
                    {item.userRating}
                    <Star className="h-3 w-3 fill-primary text-primary" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="absolute right-2 top-2 rounded-full bg-background/20 px-2 py-1 text-sm font-semibold backdrop-blur-sm cursor-pointer z-40">
                            {
                                (item.contentType === "movie") ? <Film className="h-4 w-4" /> :
                                    (item.contentType === "series") ? <Tv className="h-4 w-4" /> :
                                        (item.contentType === "book") ? <BookOpen className="h-4 w-4" /> :
                                            <Gamepad2 className="h-4 w-4" />
                            }
                        </div>
                    </DropdownMenuTrigger>

                    {
                        item.tags ? (
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => router.push(`/collection/update/${item.id}`)}>
                                        Edit in colection
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        View details
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-400">
                                    Delete from collection
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        ) : (
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => router.push(`/collection/update/${item.id}`)}>
                                        Add to colection
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        View details
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-400">
                                    Delete from wishlist
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        )
                    }

                </DropdownMenu>

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-300">Added {new Date(item.createdAt).toLocaleDateString()}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                        {item.tags && item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-background/20 hover:bg-background/30">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CollectionCard