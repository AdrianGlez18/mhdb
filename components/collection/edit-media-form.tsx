"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
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
import { useProfile } from "../context/profile-context"

export type ActionType = "add" | "update";
export type MediaType = "movie" | "series" | "book" | "game";
interface EditMovieFormProps {
    defaultValues: any
    mediaType: MediaType
    action: ActionType
}

const EditMovieForm = ({ defaultValues, mediaType, action }: EditMovieFormProps) => {

    //const { profile, loading: profileLoading } = useProfile();
    const router = useRouter()
    const { refreshed, setRefreshed } = useProfile();
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
            setRefreshed(true);
        },
        onError: () => {
            console.log(createFieldErrors);
            toast.error("Error while creating content");
        }
    });

    const { execute: executeUpdate, fieldErrors: updateFieldErrors } = useAction(updateCollectionItem, {
        onSuccess: (data) => {
            toast.success('Content updated successfully!');
            setRefreshed(true);
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
                            {/* <p className="text-sm text-muted-foreground">{defaultValues.overview.slice(0, 500)}</p> TODO FALLA AL AÑADIR LIBROS SI NO HAY OVERVIEW*/}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
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
                                    {/* <FormField
                                        control={form.control}
                                        name="lastWatched"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Watched</FormLabel>
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
                                    /> */}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Status</h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="isFavorited"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Favorite</FormLabel>
                                                    <FormDescription>Mark this movie as a favorite</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isOwned"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Owned</FormLabel>
                                                    <FormDescription>You own this movie</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isWatching"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Currently Watching</FormLabel>
                                                    <FormDescription>You are currently watching this</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
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