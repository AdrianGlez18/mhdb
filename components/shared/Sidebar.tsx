"use client";

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button';
import ThemeButton from './ThemeButton';
import LangButton from './LangButton';


const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className='w-72  p-5 shadow-md  h-screen hidden lg:visible lg:flex lg:sticky top-0 left-0'>

            <div className="flex size-full flex-col gap-4 m-4 p-4 border-purple-200/50">
                {/* <Link href='/' className='sidebar-logo'>
                    <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
                </Link> */}
                <Link href="/" className="flex items-center md:py-2">
                    <Image src="/assets/images/logo-blue.png" alt="logo" width={150} height={33} className='mx-2' />
                </Link>
                <div className='flex w-full items-center justify-around'>
                    {/* <LangButton /> */}
                    <ThemeButton />
                    <div className="flex-center cursor-pointer gap-2 mx-4">
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </div>
                <nav className="sidebar-nav justify-around">
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {
                                navLinks.slice(0, 6).map((link) => {
                                    const isActive = pathname.includes(link.label.toLowerCase()) //link.route === pathname
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-white'
                                            }`}>
                                            <Link className='sidebar-link' href={link.route}>
                                                <Image src={link.icon} alt='icon' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <ul className="sidebar-nav_elements">
                            {
                                navLinks.slice(6).map((link) => {
                                    const isActive = link.route === pathname
                                    return (
                                        <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                                            }`}>
                                            <Link className='sidebar-link' href={link.route}>
                                                <Image src={link.icon} alt='icon' width={24} height={24} className={`${isActive && 'brightness-200'}`} />
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            {/* <li className="flex-center cursor-pointer gap-2 p-4">
                                <UserButton afterSignOutUrl='/' showName />
                            </li> */}
                        </ul>
                    </SignedIn>

                    {/* <SignedOut>
                        <Button asChild className='button bg-purple-gradient bg-cover'>
                            <Link href='sign-in'>Login</Link>
                        </Button>
                    </SignedOut> */}
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar