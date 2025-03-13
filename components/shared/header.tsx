"use client"

import Image from "next/image"
import Link from "next/link"
import ThemeButton from "./theme-button"
import { usePathname } from "next/navigation"
import UserButton from "./user-button"

export const headerLinks = [
    {
        name: "Movies",
        href: "/discover/movie"
    },
    {
        name: "Series",
        href: "/discover/series"
    },
    {
        name: "Books",
        href: "/discover/book"
    },
    {
        name: "Games",
        href: "/discover/game"
    },
    {
        name: "Collection",
        href: "/collection"
    }
]

const Header = () => {
    const pathname = usePathname()
    return (
        <div className="w-full hidden md:block">
            <div className="flex items-center justify-between p-2 mx-6 my-2 lg:mx-12 lg:my-4 xl:mx-16 xl:my-6">
                <Link href="/discover">
                    <Image src="/images/logo-header.png" alt="MHDB" width={100} height={50} />
                </Link>
                <div className="flex gap-8">
                    {headerLinks.map((link) => (
                        <div className="relative" key={link.name}>
                            <Link href={link.href} className="flex items-center gap-1">
                                <span className="text-lg font-medium">{link.name}</span>
                            </Link>
                            {pathname === link.href && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 p-1">
                    <UserButton displayUsername={false} />
                <ThemeButton />
                </div>
            </div>
        </div>
    )
}

export default Header