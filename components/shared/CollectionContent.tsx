"use client"

import { getMovieCollectionByUserId } from '@/lib/actions/movieCollection.actions';
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '../ui/button';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import LongCard from './LongCard';
import TabHeader from './TabHeader';

const CollectionContent = ({ typeOfCollection, collection, userId }: any) => {

  const elementsPerPage = 10;

  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(Math.floor(collection.movies.length / elementsPerPage) + 1)

  const filterCollection = () => {
    const newMovieCollection = collection.movies.filter((movie: any) => movie[filter]);
    return newMovieCollection;
  }

  const getCollection = () => {
    const newMovieCollection = collection.movies.filter((movie: any) => !movie.isWishlisted);
    return newMovieCollection;
  }
  
useEffect(() => {
  if (filter !== 'all' && filter !== '') {
    const newCollection = filterCollection();
    setTotalPages(Math.floor(newCollection.length / elementsPerPage) + 1);
  } else {
    const newCollection = getCollection()
    setTotalPages(Math.floor(newCollection.length / elementsPerPage) + 1);
  }
}, [filter])

  /* if (typeOfCollection === 'movies') {
    totalPages = Math.floor(collection.movies.length / elementsPerPage) + 1;
  } */

  const onPageChange = (action: string) => {
    action === "next" ? setPage(Number(page) + 1) : setPage(Number(page) - 1);
  };

  return (
    <>
      <TabHeader typeOfFilter="movies" filter={filter} setFilter={setFilter} />
      <div className="grid lg:grid-cols-2 gap-4 my-5">
        {
          (typeOfCollection === 'movies' && (filter === 'all' || filter === '')) ?
            (getCollection().slice((page - 1) * elementsPerPage, page * elementsPerPage).map((movie: any) => {
              return <LongCard element={movie} filter={filter}/>
            })) : (
              filterCollection().slice((page - 1) * elementsPerPage, page * elementsPerPage).map((movie: any) => {
                //console.log(movie)
                if (movie[filter]) {
                  return <LongCard element={movie} filter={filter}/>
                }
              }))
        }
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}

export default CollectionContent