import AddMovieButton from "@/components/shared/AddMovieButton";
import { ContextMenuDemo } from "@/components/shared/ContextMenuDemo";
import { Button } from "@/components/ui/button"
import { addMovieToCollection } from "@/lib/actions/movieCollection.actions"
import { auth, SignedIn } from "@clerk/nextjs";


const Add = ({ params }: any) => {
    const id = params.id;
    const { userId } = auth();
    const newMovie = {
        tmdbId: id,
        title: "Test",
        rating: 3,
        imageUrl: "TEST2",
        categories: ['Anime'],
        comments: 'Good',
        flags: {
            "watched": true,
            "own": false,
            "watching": false,
            "plan to watch": false,
            "plan to buy": true
        }
    }
    return (
        <SignedIn>
            <div>
                <AddMovieButton userId = {userId} newMovie = {newMovie} />
                <ContextMenuDemo/>
            </div>
        </SignedIn>
    )
}

export default Add