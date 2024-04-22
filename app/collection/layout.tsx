import Header from '@/components/shared/Header'
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
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

export default Layout