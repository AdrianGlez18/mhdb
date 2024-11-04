import Header from '@/components/shared/Header'
import MobileNav from '@/components/shared/MobileNav'
import { Toaster } from '@/components/ui/toaster'
import React, { useState } from 'react'
import { tabsIcons } from "@/constants";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
//import TabHeader from '@/components/shared/TabHeader'
import Sidebar from '@/components/shared/Sidebar';

/* const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 overflow-x-hidden'>
      <Header />
      <MobileNav />
      <main className='container mx-auto my-8 content-center justify-center'>
        {children}
        <Toaster />
      </main>
    </div>
  )
}

export default Layout */

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    /*     <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 overflow-x-hidden'>
          <Header />
          <MobileNav /> */
    <div className='w-full content-center justify-center flex flex-col bg-gray-100 dark:bg-dark-900'>
      <MobileNav />
      <div className="flex">
        <Sidebar />
        <main className="container">
          {children}
        </main>
      </div>

      <Toaster />
    </div>
    /*     </div> */
  )
}

export default Layout