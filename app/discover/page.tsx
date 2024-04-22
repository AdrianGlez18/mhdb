"use client";

import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import { usePathname } from 'next/navigation';
import React from 'react'

const Discover = async () => {

  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const pathname = usePathname();
  return (
    <>
    {pathname}
    </>
    
  )
}

export default Discover