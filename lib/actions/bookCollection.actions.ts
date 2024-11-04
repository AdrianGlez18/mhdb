"use server";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import BookCollection from "../database/models/bookCollection.model";

//Get Book Collection
export async function getBookCollectionByUserId(userId: string) {
    try {
        await connectToDatabase();

        const newBookCollection = await BookCollection.findOne({ clerkId: userId });
        console.log(newBookCollection)

        if (!newBookCollection) {
            throw new Error("Collection not found");
        }

        return JSON.parse(JSON.stringify(newBookCollection));
    } catch (error) {
        handleError(error)
    }
}


export async function createBookCollectionByUserId(userId: string) {
    try {
        await connectToDatabase();
        console.log("New book collection created")

        // Generates empty collections to fill
        const newBookCollection = await BookCollection.create({
            clerkId: userId,
            books: []
        })

        if (!newBookCollection) {
            throw new Error("Collection not created");
        }

        return JSON.parse(JSON.stringify(newBookCollection));
    } catch (error) {
        handleError(error)
    }
}

//Add movie to db
export async function addBookToCollection( userId: string, book : any) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await BookCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }


        if(collection.books.some((element: any) => element.bokId === book.bookId)) {
            return -1;
        } else {
            collection.books.push(book);
        }

        const updatedCollection = await BookCollection.findOneAndReplace({ clerkId: userId }, collection);

        //revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}

//Add movie to db
export async function addBookToWishlist( userId: string, movie : any) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await BookCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        collection.movies.push(movie);

        const updatedCollection = await BookCollection.findOneAndReplace({ clerkId: userId }, collection);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}


//Delete movie from db
export async function deleteBookFromCollection( userId: string, bookId : string) {
    try {
        await connectToDatabase();

        if (!userId) {
            throw new Error("User not found");
        }

        const collection = await BookCollection.findOne({ clerkId: userId });

        if (!collection) {
            throw new Error("Collection not found");
        }

        collection.books = collection.books.filter((e: any) => e.bookId !== bookId);
        console.log(collection.books)

        const updatedCollection = await BookCollection.findOneAndReplace({ clerkId: userId }, collection);
        

        //revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedCollection));
    } catch (error) {
        handleError(error)
    }
}