"use client"

import { useState, useEffect } from "react"
import { Construction, Hammer, Wrench, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PageUnderDevelopmentProps {
  title?: string
  message?: string
  design?: string
  development?: string
  testing?: string
  showBackButton?: boolean
}

export default function PageUnderDevelopment({
  title = "Page Under Development",
  message = "We're working hard to bring you something amazing. Check back soon!",
  design = "1/2",
  development = "1/2",
  testing = "1/2",
  showBackButton = true,
}: PageUnderDevelopmentProps) {
  const router = useRouter()
  const [toolIndex, setToolIndex] = useState(0)
  const tools = [
    { icon: Construction, color: "text-yellow-500" },
    { icon: Hammer, color: "text-blue-500" },
    { icon: Wrench, color: "text-green-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setToolIndex((current) => (current + 1) % tools.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const CurrentTool = tools[toolIndex].icon

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center w-full">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping opacity-20">
          <CurrentTool className={`h-16 w-16 ${tools[toolIndex].color}`} />
        </div>
        <CurrentTool className={`relative h-16 w-16 ${tools[toolIndex].color}`} />
      </div>

      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{message}</p>

        <div className="mt-8 flex justify-center gap-3">
          {showBackButton && (
            <Button variant="outline" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
          {/* <Button variant="default" onClick={() => window.location.reload()} className="gap-2">
            Check Again
          </Button> */}
          <Button variant="secondary" asChild>
            <Link href="/discover">Check trending</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2 rounded-lg border p-4">
            <div className="font-medium">Design</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className={`h-2 rounded-full bg-yellow-500 w-${design}`} />
            </div>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="font-medium">Development</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className={`h-2 rounded-full bg-blue-500 w-${development}`} />
            </div>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="font-medium">Testing</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className={`h-2 rounded-full bg-green-500 w-${testing}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

