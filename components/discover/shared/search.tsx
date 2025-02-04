"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

export const formSchema = z.object({
    query: z.string().min(3),
})

export const Search = ({ contentType }: { contentType: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
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
        }, 2000);

        return () => clearTimeout(delayDebounceFn);
    }, [router, searchParams, query]);


    return (

        <div className="my-4 w-full flex items-center justify-center">
            <div className="flex items-center content-center text-center justify-center w-1/2 lg:w-1/3">
                <Input
                    type="search"
                    onChange={(e) => { if (e.target.value.length > 2) { setQuery(e.target.value) } }}
                    id="search-dropdown"
                    className="justify-center items-center content-center align-center block min-w-2/3 z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                    placeholder={`Search for ${contentType}...`} 
                    aria-label="Search"
                    required 
                    />
                <Button type="submit" className=" p-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </Button>
            </div>
        </div>
    );
};
