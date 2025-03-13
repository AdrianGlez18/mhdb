"use client"

import React from 'react'
import DiscoverCard from '@/components/discover/shared/discover-card';
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/discover/shared/search';
import ResultsCard from './results-card';
import { ContentType } from '@prisma/client';

const SearchResults = ({ content, totalPages, page, contentType }: { content: any, totalPages: number, page: number, contentType: ContentType }) => {

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
  console.log(content)
  /* let title: string = '';
  let rating = '0'; */
  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 max-w-6xl mx-auto py-4 overflow-x-hidden content-center justify-center">
        { Array.isArray(content) &&
          content.map((item: any) => {
            id = item.id
            return (
              <ResultsCard key={id} content={item} contentType={contentType} />
            )

          })
        }
      </div>
      <div className="max-w-6xl mx-auto content-center justify-center">
        {totalPages > 1 && (
          <Pagination className="my-10">
            <PaginationContent className="flex w-full">
              <Button
                disabled={Number(page) <= 1}


              >
                <PaginationPrevious className="hover:bg-transparent hover:text-white" onClick={() => onPageChange("prev")} />
              </Button>

              <p className="text-center p-16-medium w-fit flex-1">
                {page} / {totalPages}
              </p>

              <Button


                disabled={Number(page) >= totalPages}
              >
                <PaginationNext className="hover:bg-transparent hover:text-white" onClick={() => onPageChange("next")} />
              </Button>
            </PaginationContent>
          </Pagination>
        )}
      </div>

    </>
  )
}

export default SearchResults