import { Button } from '../ui/button'
import Link from 'next/link'
import { checkIfWishlisted } from '@/lib/validations'
import { addMovieToWishlist } from '@/lib/actions/movieCollection.actions'
import { useToast } from '../ui/use-toast'
import AddMovieToWishlistButton from './AddMovieButton copy'

const CollectionCard = async ({ id, img, title, rank, userId }: { id: string, img: string, title: string, rank: string, userId: string }) => {
    const newMovie = {
        tmdbId: id,
        title: title,
        rating: 0,
        imageUrl: img,
        categories: [],
        comments: '',
        flags: {
            "watched": true,
            "own": false,
            "watching": false,
            "plan to watch": true,
            "plan to buy": false
        }
    }
    
    const addToWishlist = async () => {
        const isWishlisted = checkIfWishlisted(userId, id);
        const { toast } = useToast();

        console.log("called")



        if (!isWishlisted) {


            const result = await addMovieToWishlist(userId, newMovie);

            toast({
                title: 'Added successfully',
                description: 'Movie added to wishlist',
                duration: 5000,
                className: 'success-toast'
            })
        } else {
            toast({
                title: 'Already wishlisted',
                description: 'Movie already in your wishlist',
                duration: 5000,
                className: 'success-toast'
            })
        }
    }
    return (
        <div className="py-3 w-full bg-gray-300 dark:bg-dark-700 border-white rounded-xl flex flex-col gap-2 items-center text-center">
            <div className="grid grid-cols-6 w-full">
                <div className="col-span-5">
                    <h2 className="text-3xl font-bold">{title}</h2>
                </div>
                <div className="col-span-1 text-center justify-center content-center items-center">
                    <div className="bg-yellow-400 font-bold rounded-full p-16-semibold w-8 h-8 text-center justify-center content-center items-center">{rank}</div>
                </div>

            </div>

            <div className="flex gap-2 my-2">
                <img className="rounded-3xl shadow-lg" src={img} alt={title} height={300} width={200} />
            </div>

            <div className="flex gap-3 items-center">
                <Link href={`/discover/movies/${id}/add`} className="card-button w-full bg-green-300 p-3" title='Add to collection'>
                    <img src="/assets/icons/add-list.png" alt="Add to collection" aria-label='Add to collection' height={20} width={20} />
                  
                </Link>
                <Link href={`/discover/movies/${id}`} className="card-button w-full bg-green-300 p-3" title='View Details'>
                  <img src="/assets/icons/view-details.png" alt="View details" aria-label='View Details' height={20} width={20} />
                   
                </Link>
                <AddMovieToWishlistButton newMovie={newMovie} userId={userId}/>
            </div>


        </div>
    )
}

export default CollectionCard

/**
 * Cambiar el bootn por uno igual a <AddMovieButton userId = {userId} newMovie = {newMovie} /> pero para wishlist
 */