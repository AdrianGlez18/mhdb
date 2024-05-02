"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";

export const formSchema = z.object({
  type: z.string(),
  query: z.string().min(3),
})

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const initialValues = {
    type: 'All',
    query: ''
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // TODO 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const router = useRouter()

    const newQuery: string = values.query.trim().replace('', '+');

    if (values.query !== '') {
      if (values.type === 'All') {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${newQuery}&api_key=${TMDB_API_KEY}&language=en-US&page=1`,
          { next: { revalidate: 10000 } }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        setMovies(data.results.filter((movie: any) => movie.media_type === 'movie'))
      }
    }

    setIsSubmitting(false)
  }

  /* useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]); */


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" my-4 w-full flex items-center justify-center">
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className="flex items-center content-center text-center justify-center w-1/6">
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button id="dropdown-button" data-dropdown-toggle="dropdown" className="w-full flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                      {category} <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCategory("All")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategory("Title")}>Title</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategory("Team")}>Team</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='query'
          render={({ field }) => (
            <FormItem className="flex items-center content-center text-center justify-center w-1/2 lg:w-1/3">
              <FormControl>
                <Input
                  type="search"
                  id="search-dropdown"
                  className="justify-center items-center content-center align-center block min-w-2/3 z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />

              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className=" p-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search</span>
        </Button>

      </form>
    </Form>
  );
};