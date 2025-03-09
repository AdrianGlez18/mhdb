"use client"

import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { YouTubeEmbed } from '@next/third-parties/google'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Play } from 'lucide-react'
import React from 'react'

interface TrailerButtonProps {
    title: string,
    description: string,
    youtubeKey: string,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const TrailerButton = ({ title, description, youtubeKey, isDialogOpen, setIsDialogOpen }: TrailerButtonProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                    <Play className="h-5 w-5" />
                    Watch Trailer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className='hidden lg:block'>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full p-1">
                    <div className="aspect-video">
                        <YouTubeEmbed videoid={youtubeKey} height={200} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TrailerButton