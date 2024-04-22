import { getMovieCollectionByUserId } from '@/lib/actions/movieCollection.actions';
import React from 'react'

const CollectionContent = async ({ userId, typeOfCollection }: { userId: string, typeOfCollection: string }) => {
    let collection: any;
    if (typeOfCollection === 'movies') {
        collection = await getMovieCollectionByUserId(userId);
        console.log(collection)
    }
    return (
        <div>
            {
                collection.movies.map((movie: any) => {
                    return <p>{ movie.title }</p>
                })
            }
        </div>
    )
}

export default CollectionContent