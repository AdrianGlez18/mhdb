import MediaDetails from "@/components/discover/shared/media-details"
import { getTMDBDetails } from "@/lib/server/discover"

const SeriesDetailsPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const series = await getTMDBDetails(id, 'tv')
    return (
        <MediaDetails content={series} />
    )
}

export default SeriesDetailsPage