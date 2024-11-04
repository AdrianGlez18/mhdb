import Header from '@/components/shared/Header'
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

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