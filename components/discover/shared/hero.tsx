"use client"

import { Play, Plus } from 'lucide-react'
import { YouTubeEmbed } from '@next/third-parties/google'

import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Hero({ trailer }: { trailer: any }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  console.log(trailer)
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w1280${trailer.backdrop_path}`}
        alt="Featured movie"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-background/20" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{trailer.title}</h1>
        <p className="mt-2 max-w-xl text-lg text-gray-200">
          {trailer.description}
        </p>
        <div className="mt-4 flex gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Trailer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>{trailer.title}</DialogTitle>
                <DialogDescription>
                  {trailer.description}
                </DialogDescription>
              </DialogHeader>

              <div className="w-full p-1">
              <div className="aspect-video">
                <YouTubeEmbed videoid={trailer.key} height={200} />
                </div>
              </div>


            </DialogContent>
          </Dialog>
          <Link href={`/discover/movie/${trailer.id}`} passHref>
          <Button size="lg" variant="secondary">
            Learn More
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
//todo learn more
