"use client";

import { collectionLinks, discoverLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { MusicalNoteIcon, MoonIcon } from '@heroicons/react/24/solid';
import { UserButton } from '@clerk/nextjs';

{/* <header className='shadow-sm py-5 z-50 bg-white dark:bg-black w-[100vw] overflow-hidden'> */ }
const TabHeader = () => {
  const pathname = usePathname();
   
  return (
    <div className="flex flex-col align-center content-center justify-center text-center items-center">
      <h2 className='h2-bold m-8'>Discover content</h2>
      <div className="w-full">
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {
            discoverLinks.map((link) => {
              const isActive = link.route === pathname
              return (

                <Link
                  key={link.route}
                  className={` p-4 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group 
                  ${isActive ? 'bg-background text-foreground shadow-sm rounded-full' : 'text-gray-700 dark:text-gray-100'}`}
                  href={link.route}>
                  <div className="flex m-2 gap-2">{link.icon}{link.label}</div>
                </Link>

              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TabHeader
/* 
<div className="flex flex-col align-center content-center justify-center text-center items-center">
      <h2 className='h2-bold m-8'>Your collection</h2>
      <div className="">
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          <Link href="/collection/movies"  className={`p-4 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm p-4`}><div className="flex m-2 gap-2">{tabsIcons.movies}Movies</div></Link>
          <Link href="/collection/series" className='p-4 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm p-4'><div className="flex m-2 gap-2">{tabsIcons.series}Series</div></Link>
          <Link href="/collection/games" className='p-4 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm p-4'><div className="flex m-2 gap-2">{tabsIcons.games}Games</div></Link>
          <Link href="/collection/books" className='p-4 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  p-4'><div className="flex m-2 gap-2">{tabsIcons.books}Books</div></Link>
        </div>
      </div>
    </div> */