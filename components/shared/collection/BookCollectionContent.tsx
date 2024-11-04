"use client"

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import LongCard from '../LongCard';
import TabHeader from "../collection/TabHeader";
import BookCard from "./BookCard";

const CollectionContent = ({ collection, userId }: any) => {

  const elementsPerPage = 25;

  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useState("");
  const [currentCollection, setCurrentCollection] = useState(collection)
  //console.log("Current Collection", currentCollection)
  const pagesAmount = Math.floor(collection.length / elementsPerPage) + 1
  const [totalPages, setTotalPages] = useState(pagesAmount)

  const filterCollection = () => {
    setCurrentCollection(collection.filter((e: any) => e[filter]));
    console.log("currentCollection.length on filter", currentCollection.length)
  }

  const checkColectionTags = () => {
    setCurrentCollection(collection.filter((element: any) => element.tags.includes(tags)));
    console.log("currentCollection.length on tagchange", currentCollection.length)
  }

  useEffect(() => {
    setCurrentCollection(collection)
    if (filter !== 'all' && filter !== '') {
      filterCollection();
    }
    if (tags !== '') {
      checkColectionTags();
    }
    setTotalPages(Math.floor(currentCollection.length / elementsPerPage) + 1);
    console.log("totalPages", totalPages)
  }, [filter, tags])

  const onPageChange = (action: string) => {
    action === "next" ? setPage(Number(page) + 1) : setPage(Number(page) - 1);
  };

  //console.log(currentCollection)
  return (
    <>
      <TabHeader typeOfFilter="movies" filter={filter} setFilter={setFilter} tags={tags} setTags={setTags}/>
      <div className="grid lg:grid-cols-2 gap-4 my-5">
        {
          currentCollection.slice((page - 1) * elementsPerPage, page * elementsPerPage).map((book: any) => {
            return <BookCard element={book} key={book.bookId} filter={filter} currentCollection={currentCollection} setCurrentCollection={setCurrentCollection} userId={userId}/>
          })
        }
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-10 mb-8">
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