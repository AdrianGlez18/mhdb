import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import { getMovieCollectionByUserId } from '@/lib/actions/movieCollection.actions';
import { MovieInterface } from '@/lib/database/models/movieCollection.model';
import { auth } from '@clerk/nextjs';
import { redirect, usePathname } from 'next/navigation';
import React from 'react'

const Discover = async () => {
  //const pathname = usePathname();
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const movieCollection = await getMovieCollectionByUserId(userId);

  return (
    <>
    abcd
    {
      movieCollection.movies.map((movie : MovieInterface) => {
        return movie.title
      })
    }
    </>
    
  )
}

export default Discover