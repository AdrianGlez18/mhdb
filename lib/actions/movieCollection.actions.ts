"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import ImageModel from "../database/models/image.model";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from 'cloudinary';
import MovieCollection, { MovieInterface } from "../database/models/movieCollection.model";

const populateUser = (query: any) => query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId'
})



//Update image 
export async function updateImage({ image, userId, path }: UpdateImageParams) {
    try {
        await connectToDatabase();

        const imageToUpdate = await ImageModel.findById(image._id);

        if (!imageToUpdate || imageToUpdate.author.toHexString() != userId) {
            throw new Error("Unauthorized or Image not found");
        }

        const updatedImage = await ImageModel.findByIdAndUpdate(
            imageToUpdate._id,
            image,
            { new: true }
        )

        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedImage));
    } catch (error) {
        handleError(error);
    }
}

//Delete image 
export async function deleteImage(imageId: string) {
    try {
        await connectToDatabase();

        await ImageModel.findByIdAndDelete(imageId);

    } catch (error) {
        handleError(error)
    } finally {
        redirect('/');
    }
}

//Get Image
export async function getImageById(imageId: string) {
    try {
        await connectToDatabase();

        const image = await populateUser(ImageModel.findById(imageId));

        if (!image) {
            throw new Error("Image not found");
        }

        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error)
    }
}

//Get Images
export async function getAllImages({ limit = 9, page = 1, searchQuery = '' }: {
    limit?: number, page: number, searchQuery?: string
}) {
    try {
        await connectToDatabase();

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        })

        let expression = 'folder=mhdb';

        if (searchQuery && searchQuery !== '') {
            expression += ` AND ${searchQuery}`
        }

        const { resources } = await cloudinary.search.expression(expression).execute();

        const resourceIds = resources.map((resource: any) => {
            resource.public_id
        })

        let query = {};

        if (searchQuery && searchQuery !== '') {
            query = {
                publicId: {
                    $in: resourceIds
                }
            }
        }

        const skipAmount = (Number(page) - 1) * limit;

        const images = await populateUser(ImageModel.find(query))
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit);

        const totalImages = await ImageModel.find(query).countDocuments();
        const savedImages = await ImageModel.find().countDocuments();

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
            savedImages
        }

    } catch (error) {
        handleError(error)
    }
}

// GET IMAGES BY USER
export async function getUserImages({
    limit = 9,
    page = 1,
    userId,
}: {
    limit?: number;
    page: number;
    userId: string;
}) {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;

        const images = await populateUser(ImageModel.find({ author: userId }))
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit);

        const totalImages = await ImageModel.find({ author: userId }).countDocuments();

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPages: Math.ceil(totalImages / limit),
        };
    } catch (error) {
        handleError(error);
    }
}




//Get Movie Collection
export async function getMovieCollectionByUserId(userId: string) {
    try {
        await connectToDatabase();

        //const image = await populateUser(ImageModel.findById(imageId));
        const newMovieCollection = await MovieCollection.findOne({ clerkId: userId });

        if (!newMovieCollection) {
            throw new Error("Collection not found");
        }

        return JSON.parse(JSON.stringify(newMovieCollection));
    } catch (error) {
        handleError(error)
    }
}


export async function createMovieCollectionByUserId(userId: string) {
    try {
        await connectToDatabase();
        console.log("New movie created")

        // Generates empty collections to fill
        const newMovieCollection = await MovieCollection.create({
            clerkId: userId,
            movies: []
        })

        if (!newMovieCollection) {
            throw new Error("Collection not created");
        }

        return JSON.parse(JSON.stringify(newMovieCollection));
    } catch (error) {
        handleError(error)
    }
}

//Add movie to db
export async function addMovieToCollection( userId: string, movie : any) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        /* console.log(movie);

        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")

        console.log(userId)

        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################") */

        /* const updatedCollection = await MovieCollection.findOneAndUpdate({ clerkId: userId }, {
            "$push": {
                "movies": { movie }
            }
        }, {
            new: true,
        }); */

        const collection = await MovieCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        /* console.log(collection.movies)
        console.log(collection)

        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################") */

        collection.movies.push(movie);

        /* console.log(collection)

        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################")
        console.log("###############################################") */

        const updatedCollection = await MovieCollection.findOneAndReplace({ clerkId: userId }, collection);

        //revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}

//Add movie to db
export async function addMovieToWishlist( userId: string, movie : any) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await MovieCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        collection.movies.push(movie);

        const updatedCollection = await MovieCollection.findOneAndReplace({ clerkId: userId }, collection);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}


//Delete movie from db
export async function deleteMovieFromCollection( userId: string, movieId : string) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await MovieCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        collection.movies = collection.movies.filter((e: any) => e.tmdbId !== movieId);

        const updatedCollection = await MovieCollection.findOneAndReplace({ clerkId: userId }, collection);

        //revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}