"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookDefaultValues, bookFormatOptions } from "@/constants"
import { CustomField } from "./CustomField"
import { useEffect, useState, useTransition } from "react"

import { useRouter } from "next/navigation"
import { CheckboxInput } from "../../CheckBoxInput"
import { CheckBoxCustomField } from "./CheckBoxCustomField"
import Rating from "../../Rating"
import CalendarInput from "../../CalendarInput"
import { addBookToCollection, createBookCollectionByUserId } from "@/lib/actions/bookCollection.actions"
import { toast } from "../../../ui/use-toast"
import { time } from "console"

export const formSchema = z.object({
  title: z.string(),
  publicId: z.string(),
  rating: z.string().optional(),
  cost: z.string().optional(),
  currency: z.string().optional(),
  format: z.string().optional(),
  isRead: z.boolean(),
  isReading: z.boolean(),
  isOwned: z.boolean(),
  isFavorited: z.boolean(),
  timesRead: z.string().optional(),
  lastStartReadingDate: z.date().optional(), //z.array(z.date().optional()),
  lastEndReadingDate: z.date().optional(), //z.array(z.date().optional()),
  comments: z.string().optional(),
  tags: z.string().optional()
})

//const AddBookForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
const AddBookForm = ({ action, data = null, userId, bookId, book }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const [rating, setRating] = useState("0")

  const imageUrl = book.volumeInfo.imageLinks.thumbnail;
  const title = book.volumeInfo.title;
  const authors = book.volumeInfo.authors;

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    publicId: data?.publicId,
    rating: data?.rating,
    cost: data?.cost,
    currency: data?.currency,
    format: data?.format,
    isRead: data?.isRead,
    isReading: data?.isReading,
    isOwned: data?.isOwned,
    isFavorited: data?.isFavorited,
    timesRead: data.timesRead,
    lastStartReadingDate: data.lastStartReadingDate,
    lastEndReadingDate: data.lastEndReadingDate,
    comments: data?.comments,
    tags: data?.tags.join(',')
  } : bookDefaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // TODO 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    values.rating = rating;

    const currenttags: string[] = typeof (values.tags) === 'string' ? values.tags.split(',') : [];
    console.log(currenttags)

    const newBook = {
      bookId: bookId,
      imageUrl: imageUrl,
      title: title,
      author: authors[0],
      rating: values.rating,
      isReading: values.isReading,
      isRead: values.isRead,
      isWishlisted: false,
      isFavorited: values.isFavorited,
      isOwned: values.isOwned,
      timesRead: values.timesRead,
      lastStartReadingDate: values.lastStartReadingDate,
      lastEndReadingDate: values.lastEndReadingDate,
      comments: values.comments,
      cost: values.cost,
      currency: values.currency,
      format: values.format,
      tags: currenttags
    }
    console.log("newBook:", newBook)
    const result = await addBookToCollection(userId, newBook);
    console.log(result);

    if (result == -1) { //Book already in db
      toast({
        title: 'Already listed',
        description: 'Book already in your collection',
        duration: 5000,
        className: 'success-toast'
      })
    } else {
      toast({
        title: 'Added successfully',
        description: 'Book added to collection',
        duration: 5000,
        className: 'success-toast'
      })
    }
    setTimeout(() => {
      router.push("/collection/books")
    }, 1000);
    setIsSubmitting(false)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4">
        {/* {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />} */} {/* TODO opción de mostrar un mensaje pidiendo apoyo cada 15-20 solicitudes */}
        <h2 className="h2-bold text-center">Book Status</h2>

        <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center content-center text-center justify-center">
          <CheckBoxCustomField
            control={form.control}
            name="isReading"
            formLabel="Reading"
            htmlFor="isReading"
            icon="eye.png"
            bg="bg-blue-500"
            render={({ field }) => <CheckboxInput type="checkbox" id="isReading" {...field} />
            } />

          <CheckBoxCustomField
            control={form.control}
            name="isRead"
            formLabel="Read"
            htmlFor="isRead"
            icon="done.png"
            bg="bg-yellow-500"
            render={({ field }) => <CheckboxInput type="checkbox" id="isRead" {...field} />
            } />

          <CheckBoxCustomField
            control={form.control}
            name="isOwned"
            formLabel="In Collection"
            htmlFor="isOwned"
            icon="bookmark.png"
            bg="bg-green-500"
            render={({ field }) => <CheckboxInput type="checkbox" id="isOwned" {...field} />
            } />

          <CheckBoxCustomField
            control={form.control}
            name="isFavorited"
            formLabel="Favorite"
            htmlFor="isFavorited"
            icon="heart.png"
            bg="bg-red-500"
            render={({ field }) => <CheckboxInput type="checkbox" id="isFavorited" {...field} />
            } />
        </div>

        {
          (form.getValues().isOwned === true) ?
            (
              <div className="flex gap-4">
                <CustomField
                  control={form.control}
                  name="cost"
                  formLabel="Cost"
                  className="w-full"
                  render={({ field }: any) => <Input type="number" step="0.01" {...field} className="input-field" />}
                />

                <CustomField
                  control={form.control}
                  name="currency"
                  formLabel="Currency"
                  className="w-full"
                  render={({ field }: any) => <Input type="text" {...field} className="input-field" />}
                />

                <CustomField
                  control={form.control}
                  name="format"
                  formLabel="Format"
                  className="w-full"
                  render={({ field }: any) => (
                    <Select
                      value={field.value}
                    >
                      <SelectTrigger className="select-field">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {bookFormatOptions.map((key) => (
                          <SelectItem key={key} value={key} className="select-item">
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            ) : ''
        }
        {
          (form.getValues().isRead === true || form.getValues().isFavorited === true) ? (
            <div className="flex gap-4">
              <CustomField
                control={form.control}
                name="timesRead"
                formLabel="Times Read"
                className="w-full"
                render={({ field }: any) => <Input type="number" min={0} {...field} className="input-field" />
                }
              />
              {/**TODO Revisar */}


              {/* <CustomField
                control={form.control}
                name="lastStartReadingDate"
                formLabel="When was watched"
                className="w-full"
                render={({ field } : any) => <Input {...field} className="input-field" />} /> */}

              <CalendarInput
                control={form.control}
                name="lastStartReadingDate"
                formLabel="Started Reading"
                formDescription="" />

              <CalendarInput
                control={form.control}
                name="lastEndReadingDate"
                formLabel="Finished Reading"
                formDescription="" />

            </div>) : ''
        }




        {/* <CustomField
          control={form.control}
          name="rating"
          formLabel="Rating"
          className="w-full"
          render={({ field } : any) => <Rating {...field} />}
        /> */}


        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Rating rating={rating} setRating={setRating} /* {...field} className="input-field" */ />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomField
          control={form.control}
          name="comments"
          formLabel="Comments"
          className="w-full"
          render={({ field }: any) => <Input {...field} className="input-field" />}
        />

        <CustomField
          control={form.control}
          name="tags"
          formLabel="Tags"
          className="w-full"
          render={({ field }: any) => <Input {...field} className="input-field" />}
        />


        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
            onSubmit={(e) => e.preventDefault()}
          >
            {isSubmitting ? 'Submitting...' : 'Store in collection'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddBookForm