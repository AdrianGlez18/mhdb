import translations from '@/data/translations.json'
import Link from 'next/link'
import AddMovieToWishlistButton from '../AddMovieToWishlistButton'


const DiscoverCard = async ({ id, img, title, rank, userId, contentType }: { id: string, img: string, title: string, rank: string, userId: string, contentType: string }) => {
    /* const [lang, setLang] = useRecoilState(localeState); */
    //const [lang, setLang] = useState('English')
    const newMovie = {
        tmdbId: id,
        title: title,
        rating: 0,
        imageUrl: img,
        categories: [],
        comments: '',
        isWatching: false,
        isWatched: false,
        isWishlisted: true,
        isFavorited: false,
        isOwned: false,
    }

    return (
        <div className="py-3 w-full bg-gray-300 dark:bg-dark-700 border-white rounded-xl flex flex-col gap-2 items-center text-center justify-between">
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
                <Link href={`/discover/${contentType}/${id}/add`} className="card-button w-full bg-green-300 p-3" title='Add to collection'>
                    <img src="/assets/icons/add-list.png" alt="Add to collection" aria-label='Add to collection' height={20} width={20} />

                </Link>
                <Link href={`/discover/${contentType}/${id}`} className="card-button w-full bg-green-300 p-3" title='View Details'>
                    <img src="/assets/icons/view-details.png" alt="View details" aria-label='View Details' height={20} width={20} />

                </Link>
                <AddMovieToWishlistButton newMovie={newMovie} userId={userId} />
            </div>


        </div>
    )
}

export default DiscoverCard

/**
 * Cambiar el bootn por uno igual a <AddMovieButton userId = {userId} newMovie = {newMovie} /> pero para wishlist
 */