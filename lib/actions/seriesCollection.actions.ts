"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import ImageModel from "../database/models/image.model";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from 'cloudinary';
import MovieCollection, { MovieInterface } from "../database/models/movieCollection.model";
import SeriesCollection from "../database/models/seriesCollection.model";

//Get Series Collection
export async function getSeriesCollectionByUserId(userId: string) {
    try {
        await connectToDatabase();

        //const image = await populateUser(ImageModel.findById(imageId));
        const newSeriesCollection = await SeriesCollection.findOne({ clerkId: userId });
        console.log(newSeriesCollection)

        if (!newSeriesCollection) {
            throw new Error("Collection not found");
        }

        return JSON.parse(JSON.stringify(newSeriesCollection));
    } catch (error) {
        handleError(error)
    }
}


export async function createSeriesCollectionByUserId(userId: string) {
    try {
        await connectToDatabase();
        console.log("New series collection created")

        // Generates empty collections to fill
        const newSeriesCollection = await SeriesCollection.create({
            clerkId: userId,
            series: []
        })

        if (!newSeriesCollection) {
            throw new Error("Collection not created");
        }

        return JSON.parse(JSON.stringify(newSeriesCollection));
    } catch (error) {
        handleError(error)
    }
}

//Add movie to db
export async function addSeriesToCollection( userId: string, movie : any) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await SeriesCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }


        if(collection.series.some((element: any) => element.tmdbId === movie.tmdbId)) {
            return -1;
        } else {
            collection.series.push(movie);
        }

        const updatedCollection = await SeriesCollection.findOneAndReplace({ clerkId: userId }, collection);

        //revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}

//Add movie to db
export async function addSeriesToWishlist( userId: string, movie : any) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await SeriesCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        collection.movies.push(movie);

        const updatedCollection = await SeriesCollection.findOneAndReplace({ clerkId: userId }, collection);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}


//Delete movie from db
export async function deleteSeriesFromCollection( userId: string, movieId : string) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await SeriesCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        collection.movies = collection.movies.filter((e: any) => e.tmdbId !== movieId);

        const updatedCollection = await SeriesCollection.findOneAndReplace({ clerkId: userId }, collection);

        //revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}