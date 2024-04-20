"use client";

import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import { usePathname } from 'next/navigation';
import React from 'react'

const Discover = () => {
  const pathname = usePathname();
  return (
    <>
    {pathname}
    </>
    
  )
}

export default Discover