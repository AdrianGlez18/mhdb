import { BookInterface } from '@/lib/database/models/bookCollection.model';
import { SeriesInterface } from '@/lib/database/models/seriesCollection.model';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { deleteBookFromCollection } from '@/lib/actions/bookCollection.actions';

//declare type BookCardParams = MovieInterface | null;

const deleteBook = (book: BookInterface, currentCollection: any, setCurrentCollection: any, userId: string) => {
    deleteBookFromCollection(userId, book.bookId);
    setCurrentCollection(currentCollection.filter((e: any) => e.bookId !== book.bookId));
}

const BookCard = ({ element, filter, currentCollection, setCurrentCollection, userId }: 
    { element: BookInterface, filter: string, currentCollection: any, setCurrentCollection: any, userId: string }) => {
    //console.log(element)
    return (
        <div className='flex justify-between w-full rounded-3xl bg-gray-200 dark:bg-dark-700 min-h-40'>
            <img src={element?.imageUrl} height={300} width={200} alt={element?.title} className='m-1 p-1 rounded-3xl' />
            <div className="flex flex-col items-center justify-around text-center w-full">
                <h2 className='h2-bold'>{element?.title}</h2>
                {
                    filter !== 'isWishlisted' ? (
                        <div className="flex justify-around items-center gap-4 my-2">
                            {element?.rating}
                            <img
                                className='rounded-full h-4 w-4 mobile:h-[3.25rem] mobile:w-[3.25rem] flex items-center justify-center hover:text-white font-bold cursor-pointer transition duration-200 hover:bg-orange'
                                src='/assets/icons/star.svg'
                                alt='start icon'
                            />
                        </div>
                    ) : ''
                }
                <div className="flex justify-around items-center p-2 w-full">
                <Link href={`/discover/books/${element.bookId}/add`} className="card-button bg-green-300 p-3" title='Add to collection'>
                    <img src="/assets/icons/add-list.png" alt="Add to collection" aria-label='Add to collection' height={20} width={20} />
                </Link>
                <Link href={`/discover/books/${element.bookId}`} className="card-button  bg-green-300 p-3" title='View Details'>
                    <img src="/assets/icons/view-details.png" alt="View details" aria-label='View Details' height={20} width={20} />
                </Link>
                <Button className="card-button bg-red-300 p-3" title='Remove from list' onClick={() => deleteBook(element, currentCollection, setCurrentCollection, userId)}/>
                </div>
            </div>
        </div>
    )
}

export default BookCard