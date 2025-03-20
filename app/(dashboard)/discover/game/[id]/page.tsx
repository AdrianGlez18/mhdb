import MediaDetails from "@/components/discover/game/game-details"
import { getGameById } from "@/lib/server/discover"
//todo fix
const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const game = await getGameById(parseInt(id));
    return (
        <MediaDetails content={game} />
    )
}

export default GameDetailsPage