"use client";

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