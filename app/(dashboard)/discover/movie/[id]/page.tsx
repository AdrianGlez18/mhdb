import MediaDetails from "@/components/discover/shared/media-details"
import { getTMDBDetails } from "@/lib/server/discover"

const MovieDetailsPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const movie = await getTMDBDetails(id, 'movie')
    return (
        <MediaDetails content={movie} />
    )
}

export default MovieDetailsPage