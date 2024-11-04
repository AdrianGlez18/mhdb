"use client"

import React from 'react'
import DiscoverCard from './DiscoverCard';
import {
    Pagination,
    PaginationContent,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';
import { Button } from '../../../ui/button';
import { Search } from '../../Search';

const SearchResults = async ({ movies, totalPages, page, userId, contentType }: { movies: any, totalPages: number, page: number, userId: string, contentType: string }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages > 20) totalPages = 20;

    const onPageChange = (action: string) => {
        const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "page",
          value: pageValue,
        });
    
        router.push(newUrl, { scroll: false });
      };

    let id: string = '';
    let title: string = '';
    let rating = '0';
    return (
        <>
        <Search contentType={contentType} /> 
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 w-full">
      {
       movies.map((item: any) => {
          console.log(item.volumeInfo.imageLinks)
          if (typeof item.volumeInfo.imageLinks !== 'undefined') {
            return (
              <DiscoverCard 
              userId={userId!} 
              id={item.id} 
              title={item.volumeInfo.title + ' ' + item.volumeInfo.subtitle} 
              img={item.volumeInfo.imageLinks.thumbnail} 
              rank={rating} 
              contentType={"book"}/>
              
            )
            {/* <div className='col-span-1'>
                
                <img src={item.volumeInfo.imageLinks.thumbnail} width={200} height={300} />
                <p>{item.volumeInfo.title}</p>
              </div> */}
          }

        })
      }
      </div> 
        {totalPages > 1 && (
            <Pagination className="my-10">
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

export default SearchResults