"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import ThemeButton from "./theme-button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { headerLinks } from "./header"
import UserButton from "./user-button"

const MobileNavigation = () => {
  const pathname = usePathname()

  return (
    <div className="w-full block md:hidden">
      <div className="flex items-center justify-between p-2 mx-4 my-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader className="mb-6">
              <Link href="/discover" className="flex justify-center">
                <Image src="/images/logo-header.png" alt="MHDB" width={100} height={50} />
              </Link>
            </SheetHeader>
            
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4 mb-8">
              {headerLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-lg font-medium p-2 rounded-md transition-colors ${
                    pathname === link.href 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            {/* Profile Section */}
            <UserButton displayUsername={true} />
          </SheetContent>
        </Sheet>
        
        <Link href="/discover">
          <Image src="/images/logo-header.png" alt="MHDB" width={80} height={40} />
        </Link>
        
        <ThemeButton />
      </div>
    </div>
  )
}

export default MobileNavigation
