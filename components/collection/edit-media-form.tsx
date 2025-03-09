"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Book, Bookmark, Check, Eye, Home, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAction } from "@/hooks/useAction"
import { toast } from "sonner"
import { Badge } from "../ui/badge"
import { createCollectionItem } from "@/lib/server/actions/collection/create"
import { CollectionItemZodSchema } from "@/lib/server/actions/collection/create/schema"
import { updateCollectionItem } from "@/lib/server/actions/collection/update"
import Rating from "@/components/shared/Rating"


export type ActionType = "add" | "update";
export type MediaType = "movie" | "series" | "book" | "game";

interface EditMovieFormProps {
    defaultValues: any
    mediaType: MediaType
    action: ActionType
}

const EditMovieForm = ({ defaultValues, mediaType, action }: EditMovieFormProps) => {

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [rating, setRating] = useState(defaultValues.userRating || 0)
    //const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [selectedTags, setSelectedTags] = useState<string>("")
    const dateFixedDefaultValues = {
        ...defaultValues,
        startedWatching: typeof defaultValues.startedWatching === "string" ? new Date(defaultValues.startedWatching) : defaultValues.startedWatching,
        completedWatching: typeof defaultValues.completedWatching === "string" ? new Date(defaultValues.completedWatching) : defaultValues.completedWatching,
    }
    const form = useForm<z.infer<typeof CollectionItemZodSchema>>({
        resolver: zodResolver(CollectionItemZodSchema),
        defaultValues: dateFixedDefaultValues
    })

    const { execute: executeCreate, fieldErrors: createFieldErrors } = useAction(createCollectionItem, {
        onSuccess: (data) => {
            console.log(data);
            toast.success('Content created successfully!');
            //setRefreshed(true);
        },
        onError: () => {
            console.log(createFieldErrors);
            toast.error("Error while creating content");
        }
    });

    const { execute: executeUpdate, fieldErrors: updateFieldErrors } = useAction(updateCollectionItem, {
        onSuccess: (data) => {
            toast.success('Content updated successfully!');
            //setRefreshed(true);
        },
        onError: () => {
            toast.error("Error while updating content");
        }
    });

    async function onSubmit(data: z.infer<typeof CollectionItemZodSchema>) {
        setIsSubmitting(true)

        const formattedTags = selectedTags.split(',').map((tag) => tag.toLowerCase().trim()); //Todo cuando se soporten mltiples idiomas, pasar a toLocaleLowerCase

        const newMedia = {
            title: defaultValues.title,
            apiId: defaultValues.apiId,
            imageUrl: defaultValues.imageUrl,
            releaseYear: defaultValues.releaseYear,

            timesWatched: data.timesWatched,
            isFavorited: data.isFavorited,
            isOwned: data.isOwned,
            isWatching: data.isWatching,
            tags: formattedTags,
            overview: data.overview,
            notes: data.notes,
            userRating: parseInt(rating, 10),
            startedWatching: typeof data.startedWatching === "string" ? new Date(data.startedWatching) : data.startedWatching,
            completedWatching: typeof data.completedWatching === "string" ? new Date(data.completedWatching) : data.completedWatching,

            watchLog: data.watchLog,

            contentType: mediaType
        }

        if (action === "add") {
            const result = await executeCreate(newMedia)

            setTimeout(() => {
                setIsSubmitting(false)
                router.push("/collection")
            }, 150)
        } else if (action === "update") {
            const result = await executeUpdate(newMedia)

            setTimeout(() => {
                setIsSubmitting(false)
                router.push("/collection")
            }, 150)
        }
    }

    const overview = defaultValues.overview ?
        (defaultValues.overview.length >= 500 ? defaultValues.overview.slice(0, Math.min(defaultValues.overview.length, 500)) : defaultValues.overview) :
        'No description provided';

    return (
        <div className="space-y-6">
            <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <Card>
                <CardContent className="p-6">
                    <div className="flex gap-6">
                        <div className="relative h-[180px] w-[120px] flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                                src={defaultValues.imageUrl || "/placeholder.svg"}
                                alt={defaultValues.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <h1 className="text-2xl font-bold">{defaultValues.title}</h1>
                            <p className="text-sm text-muted-foreground">{overview}...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Watching Status</h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="timesWatched"
                                        render={({ field }) => (
                                            <FormItem className="sm:col-span-2">
                                                <FormLabel>Times Watched</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    {
                                        form.getValues("timesWatched") > 0 && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="startedWatching"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Started: </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="date"
                                                                    {...field}
                                                                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="completedWatching"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Completed: </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="date"
                                                                    {...field}
                                                                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                            <Separator /> */}

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Status</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {/* <FormField
                                        control={form.control}
                                        name="isFavorited"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form.control}
                                        name="isFavorited"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(!field.value)}
                                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 w-full justify-center ${field.value
                                                            ? "bg-red-700 hover:bg-red-600"
                                                            : "bg-red-400 hover:bg-red-600"
                                                            } text-white transition-colors`}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                        </svg>
                                                        Favorite
                                                        <Check className={field.value ? 'w-4 h-4' : 'hidden'} />
                                                    </button>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isOwned"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(!field.value)}
                                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 w-full justify-center ${field.value
                                                            ? "bg-blue-700 hover:bg-blue-600"
                                                            : "bg-blue-400 hover:bg-blue-600"
                                                            } text-white transition-colors`}
                                                    >
                                                        <Home className="w-4 h-4" />
                                                        Owned
                                                        <Check className={field.value ? 'w-4 h-4' : 'hidden'} />
                                                    </button>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isWatching"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(!field.value)}
                                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 w-full justify-center ${field.value
                                                            ? "bg-green-700 hover:bg-green-600"
                                                            : "bg-green-400 hover:bg-green-600"
                                                            } text-white transition-colors`}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        {mediaType === "book" ? "Reading" : mediaType === "movie" || "series" ? "Watching" : "Playing"}
                                                        <Check className={field.value ? 'w-4 h-4' : 'hidden'} />
                                                    </button>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="my-4">
                                <FormField
                                    control={form.control}
                                    name="timesWatched"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <button
                                                    type="button"
                                                    onClick={() => field.onChange((field.value || 0) + 1)}
                                                    className="flex items-center gap-2 rounded-lg px-4 py-2 w-full justify-center bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add {mediaType === "book" ? "Read" : mediaType === "game" ? "Played" : "Watched"} Entry
                                                </button>
                                            </FormControl>
                                            <div className="space-y-4 mt-4">
                                                {[...Array(field.value || 0)].map((_, index) => (
                                                    <div key={index} className="space-y-4 p-4 border rounded-lg">
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="font-bold">{mediaType === "book" ? "Read" : mediaType === "game" ? "Played" : "Watched"} Entry {index + 1}</h3>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newValue = Math.max(0, (field.value || 0) - 1);
                                                                    field.onChange(newValue);

                                                                    // Shift all entries up to remove the current one
                                                                    const watchLog = form.getValues().watchLog || [];
                                                                    if (watchLog.length > index) {
                                                                        const newWatchLog = [
                                                                            ...watchLog.slice(0, index),
                                                                            ...watchLog.slice(index + 1)
                                                                        ];
                                                                        form.setValue('watchLog', newWatchLog);
                                                                    }
                                                                }}
                                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`watchLog.${index}.startDate`}
                                                                render={({ field }) => (
                                                                    <FormItem className="flex-1">
                                                                        <FormLabel>{mediaType === "movie" ? "Watched Date" : "Start Date"}</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="date"
                                                                                {...field}
                                                                                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            {mediaType !== "movie" && <FormField
                                                                control={form.control}
                                                                name={`watchLog.${index}.endDate`}
                                                                //name="startedWatching"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex-1">
                                                                        <FormLabel>End Date</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="date"
                                                                                {...field}
                                                                                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />}
                                                        </div>
                                                        <FormField
                                                            control={form.control}
                                                            name={`watchLog.${index}.notes`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Notes</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="Add any notes about this watch..."
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Rating & Notes</h2>
                                {/* <FormField
                                    control={form.control}
                                    name="userRating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rating</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        step="0.1"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                                                    />
                                                    <Star className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </FormControl>
                                            <FormDescription>Rate this movie from 0 to 10</FormDescription>
                                        </FormItem>
                                    )}
                                /> */}
                                <FormField
                                    control={form.control}
                                    name="userRating"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Rating</FormLabel>
                                            <FormControl className="w-full flex items-center justify-center">
                                                <Rating rating={rating} setRating={setRating} /* {...field} className="input-field" */ />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="plainTags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tags separated by commas..."
                                                    className="resize-none"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setSelectedTags(e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="flex gap-2">
                                                {selectedTags.split(',').map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="cursor-pointer"
                                                    >
                                                        {tag.toLowerCase().trim()}
                                                    </Badge>
                                                ))}</div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add your personal notes about this movie..."
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>You can write up to 500 characters</FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button type="submit" className="flex-1" disabled={isSubmitting} onClick={() => console.log(form.formState.errors, form.getValues(), typeof form.getValues("startedWatching"))}>
                            {action === 'add' ? (isSubmitting ? "Adding..." : "Add to Collection")
                                : (isSubmitting ? "Updating..." : "Update Collection")}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditMovieForm