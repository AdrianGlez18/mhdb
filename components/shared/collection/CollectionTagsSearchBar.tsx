"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "mongoose"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

export const formSchema = z.object({
    tags: z.string().optional(),
})

const CollectionTagsSearchBar = ({ typeOfFilter, value, setValue }: any) => {
    const initialValues = {
        tags: "",
    }

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // TODO 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setValue(values.tags ?? "")
        console.log("Clicked")
        console.log(values)
    }
    return (
        <div className="w-full flex items-center justify-center">
            {/* <div className="flex items-center content-center text-center justify-center"> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center content-center text-center justify-center w-full">
                    <FormField
                        control={form.control}
                        name={"tags"}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="justify-center items-center content-center align-center block min-w-2/3 z-20 text-sm text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder={`Tags separated by commas`}
                                        required
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className=" p-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </Button>
                </form>
            </Form>
        </div>

    )
}

export default CollectionTagsSearchBar;
