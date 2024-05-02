import Header from '@/components/shared/Header'
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React, { useState } from 'react'
import { tabsIcons } from "@/constants";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TabHeader from '@/components/shared/TabHeader'

const Layout = ({ children }: { children: React.ReactNode }) => {
  //const path = usePathname()
  //const [search, setSearch] = useState("")
  //console.log(path)
  //let currentState = path === '/collection/movies' ? 'bg-background text-foreground shadow-sm' : ''
  return (
    <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 overflow-x-hidden'>
      <Header />
      <MobileNav />
      <main className='container mx-auto my-8 content-center justify-center'>
        {/* <TabHeader/> */}
       {children} 
        <Toaster />
      </main>
    </div>
  )
}

export default Layout