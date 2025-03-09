import MediaDetails from "@/components/discover/book/book-details"
import { getBookDetails, getTMDBDetails } from "@/lib/server/discover"
//todo
const BookDetailsPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const book = await getBookDetails(id)
    return (
        <MediaDetails content={book} />
    )
}

export default BookDetailsPage