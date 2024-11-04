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
import { creditFee, defaultValues, movieFormatOptions } from "@/constants"
import { CustomField } from "./CustomField"
import { useEffect, useState, useTransition } from "react"
//import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"
import { CheckboxInput } from "./CheckBoxInput"
import { CheckBoxCustomField } from "./CheckBoxCustomField"
import Rating from "./Rating"
import CalendarInput from "./CalendarInput"
import { addSeriesToCollection, createSeriesCollectionByUserId } from "@/lib/actions/seriesCollection.actions"
import { toast } from "../ui/use-toast"
import { createMovieCollectionByUserId } from "@/lib/actions/movieCollection.actions"

export const formSchema = z.object({
  title: z.string(),
  //aspectRatio: z.string().optional(),
  //color: z.string().optional(),
  //prompt: z.string().optional(),
  publicId: z.string(),
  rating: z.string().optional(),
  cost: z.string().optional(),
  currency: z.string().optional(),
  format: z.string().optional(),
  isWatched: z.boolean(),
  isWatching: z.boolean(),
  isOwned: z.boolean(),
  isFavorited: z.boolean(),
  timesWatched: z.string().optional(),
  whenWasWatched: z.date().optional(), //z.array(z.date().optional()),
  comments: z.string().optional(),
  categories: z.string().optional()
})

//const AddSeriesForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
const AddSeriesForm = ({ action, data = null, userId, seriesId, seriesImg, series }: any) => {
  //const transformationType = transformationTypes[type];
  //const [image, setImage] = useState(data)
  //const [timesWatchedState, settimesWatchedState] = useState([<div>A</div>])
  //const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  //const [isTransforming, setIsTransforming] = useState(false);
  //const [transformationConfig, setTransformationConfig] = useState(config)
  //const [isPending, startTransition] = useTransition()
  //const router = useRouter()
  const [rating, setRating] = useState("0")

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    //aspectRatio: data?.aspectRatio,
    //color: data?.color,
    //prompt: data?.prompt,
    publicId: data?.publicId,
    rating: data?.rating,
    cost: data?.cost,
    currency: data?.currency,
    format: data?.format,
    isWatched: data?.isWatched,
    isWatching: data?.isWatching,
    isOwned: data?.isOwned,
    isFavorited: data?.isFavorited,
    timesWatched: data?.timesWatched,
    whenWasWatched: data?.whenWasWatched,
    comments: data?.comments,
    categories: data?.categories.join(',')
  } : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // TODO 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    values.rating = rating;

    const currentCategories: string[] = typeof (values.categories) === 'string' ? values.categories.split(',') : [];

    const newSeries = {
      tmdbId: seriesId,
      imageUrl: seriesImg,
      title: series.name,
      rating: values.rating,
      isWatching: values.isWatching,
      isWatched: values.isWatched,
      isWishlisted: false,
      isFavorited: values.isFavorited,
      isOwned: values.isOwned,
      comments: values.comments,
      cost: values.cost,
      currency: values.currency,
      format: values.format,
      categories: currentCategories
    }
    const result = await addSeriesToCollection(userId, newSeries);
    console.log(result);

    if (result == -1) { //Series already in db
      toast({
        title: 'Already listed',
        description: 'Series already in your collection',
        duration: 5000,
        className: 'success-toast'
      })
    } else {
      toast({
        title: 'Added successfully',
        description: 'Series added to collection',
        duration: 5000,
        className: 'success-toast'
      })
    }
    setTimeout(() => {
      router.push("/collection/series")
    }, 1000);
    setIsSubmitting(false)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4">
        {/* {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />} */} {/* TODO opción de mostrar un mensaje pidiendo apoyo cada 15-20 solicitudes */}
        <h2 className="h2-bold text-center">Series Status</h2>

        <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center content-center text-center justify-center">
          <CheckBoxCustomField
            control={form.control}
            name="isWatching"
            formLabel="Watching"
            htmlFor="isWatching"
            icon="eye.png"
            bg="bg-blue-500"
            render={({ field }) => <CheckboxInput type="checkbox" id="isWatching" {...field} />
            } />

          <CheckBoxCustomField
            control={form.control}
            name="isWatched"
            formLabel="Watched"
            htmlFor="isWatched"
            icon="done.png"
            bg="bg-yellow-500"
            render={({ field }) => <CheckboxInput type="checkbox" id="isWatched" {...field} />
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
                  render={({ field }) => <Input type="number" step="0.01" {...field} className="input-field" />}
                />

                <CustomField
                  control={form.control}
                  name="currency"
                  formLabel="Currency"
                  className="w-full"
                  render={({ field }) => <Input type="text" {...field} className="input-field" />}
                />

                <CustomField
                  control={form.control}
                  name="format"
                  formLabel="Format"
                  className="w-full"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                    >
                      <SelectTrigger className="select-field">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {movieFormatOptions.map((key) => (
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
          (form.getValues().isWatched === true || form.getValues().isFavorited === true) ? (
            <div className="flex gap-4">
              <CustomField
                control={form.control}
                name="timesWatched"
                formLabel="Times Watched"
                className="w-full"
                render={({ field }) => <Input type="number" min={0} {...field} className="input-field" />
                }
              />
              {/**TODO Revisar */}


              {/* <CustomField
                control={form.control}
                name="whenWasWatched"
                formLabel="When was watched"
                className="w-full"
                render={({ field }) => <Input {...field} className="input-field" />} /> */}

              <CalendarInput
                control={form.control}
                name="whenWasWatched"
                formLabel="When was watched"
                formDescription="" />

            </div>) : ''
        }




        {/* <CustomField
          control={form.control}
          name="rating"
          formLabel="Rating"
          className="w-full"
          render={({ field }) => <Rating {...field} />}
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
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        <CustomField
          control={form.control}
          name="categories"
          formLabel="categories"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
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

export default AddSeriesForm