"use client";

import { discoverLinks, getIcon } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
import ThemeButton from './ThemeButton';
import { MusicalNoteIcon, MoonIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import LangButton from './LangButton';
import { UserButton } from '@clerk/nextjs';

{/* <header className='shadow-sm py-5 z-50 bg-white dark:bg-black w-[100vw] overflow-hidden'> */ }
const Header = (/* { title, subtitle }: { title: string, subtitle?: string } */) => {
  const pathname = usePathname();
  return (

    <header className='header'>
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image src="/assets/images/logo-blue.png" alt="logo" width={150} height={33} className='mx-12' />
      </Link>
      <nav className="flex gap-4 mx-5 my-2">
        <ul className="flex size-full items-center justify-center gap-4">
          {
            discoverLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname
              return (
                <li key={link.route} className={` group ${isActive ? 'bg-purple-gradient text-white rounded-full' : 'text-gray-700 dark:text-gray-100'
                  }`}>
                  <Link className='header-link' href={link.route}>
                    {/* <Image src={link.icon} alt='icon' width={24} height={24} className={`${isActive && 'brightness-200'}`} /> */}
                    {link.icon}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white">
                      <path fill-rule="evenodd" d={link.icon} clip-rule="evenodd" />
                    </svg> */}

                    {link.label}
                  </Link>

                </li>
              )
            })
          }

        </ul>
      </nav>
      <div className='flex'>
        <LangButton />
        <ThemeButton />
        <div className="flex-center cursor-pointer gap-2 mx-4">
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  )
}

export default Header

/* const Header = ({title, subtitle} : {title: string, subtitle?: string}) => {
  return (
    <>
        <h2 className="h2-bold text-dark-600">{title}</h2>
        {subtitle && <p className="p-16-regular mt-4">{subtitle}</p>}
    </>
  )
}

export default Header */