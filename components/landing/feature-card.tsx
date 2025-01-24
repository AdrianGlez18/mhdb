import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

