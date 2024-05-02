"use client"

import React from 'react'
import CollectionCard from './CollectionCard';
import {
    Pagination,
    PaginationContent,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';
import { Button } from '../ui/button';
import { Search } from './Search';

const SearchResults = async ({ movies, totalPages, page, userId }: any) => {

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

    /* if (movies.length == 0) {
        const TMDB_API_KEY = process.env.TMDB_API_KEY;

        const res = await fetch(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
            { next: { revalidate: 10000 } }
        );
        const data = await res.json();
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        //const movies = data.results.filter((movie: any) => movie.media_type === 'movie');
        setMovies(data.results.filter((movie: any) => movie.media_type === 'movie'))
    }
 */
    let id: string = '';
    let title: string = '';
    let rating = '0';
    return (
        <>
        <Search /> 
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 max-w-6xl mx-auto py-4 overflow-x-hidden content-center justify-center">
            {
                movies.map((movie: any) => {
                    id = movie.id.toString();
                    title = movie.title;
                    rating = (Math.round(movie.vote_average * 10) / 10).toString()

                        return (
                            <CollectionCard userId={userId!} id={id} title={title} img={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} rank={rating} />
                        )

                })
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

export default SearchResults