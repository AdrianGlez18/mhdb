import AddMovieButton from "@/components/shared/AddMovieButton";
import AddMovieForm from "@/components/shared/AddMovieForm";
import AddSeriesForm from "@/components/shared/AddSeriesForm";
import { ContextMenuDemo } from "@/components/shared/ContextMenuDemo";
import { Button } from "@/components/ui/button"
import { addMovieToCollection } from "@/lib/actions/movieCollection.actions"
import { auth, SignedIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

 
const Add = async ({ params }: any) => {

    const id = params.id;
    const {userId} = auth();

    if (!userId) redirect("/sign-in");

    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    console.log(`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`);

    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 10000 } }
    );
    const series = await res.json();
    console.log(series)
    if (!res.ok) {
        console.log(res)
        throw new Error('Failed to fetch data');
    }
    //const series = data.results;
    const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${series.poster_path}`;
    console.log(series.title)
    console.log(series.name)
    const title = (series.title === '' || typeof series.title === 'undefined') ? series.name : series.title;

    return (
        <SignedIn>
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-8">
                <div className="flex flex-col gap-4 col-span-1 my-6 items-center ">
                {/* <AddMovieButton userId = {userId} newMovie = {newMovie} /> */}
                <img src={imageUrl} alt={series.title} width={200} height={300} className="my-2"/>
                <div className="flex flex-col border-2 border-black rounded-xl">
                <p className="m-1 p-1">Title: {title} </p>
                {/* <p className="m-1 p-1">Release Year: {series.release_date.substring(0, 4)}</p> */}
                </div>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-3 xl:col-span-4">
                <AddSeriesForm action ={"Add"} userId={userId} seriesId={id} seriesImg={imageUrl} series={series}/>
                </div>
                {/* <ContextMenuDemo/> */}
            </div>
        </SignedIn>
    )
}

export default Add