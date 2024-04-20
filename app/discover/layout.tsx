import Header from '@/components/shared/Header'
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <MobileNav />
      <main className='root'>

        <div className="root-container">
          <div className="wrapper">
            {children}
          </div>
        </div>
        <Toaster />
      </main>
    </>
  )
}

export default Layout