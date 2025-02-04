import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
//import type { CrewMember } from "@/types"

interface MovieCrewProps {
  crew: any[]
}

export default function MovieCrew({ crew }: MovieCrewProps) {
  return (
    <div className="space-y-4">
      
      <h2 className="text-2xl font-bold">Cast & Crew</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg h-64 xl:h-96">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {crew.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <Avatar>
              <AvatarImage src={member.imageUrl} alt={member.name} />
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      </ScrollArea>
    </div>
  )
}

