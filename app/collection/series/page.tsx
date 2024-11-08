import CollectionContent from "@/components/shared/CollectionContent";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tabsIcons } from "@/constants";
import { getSeriesCollectionByUserId } from "@/lib/actions/seriesCollection.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useState } from "react";


const SeriesCollection = async () => {

  //const { userId } = auth();

  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  //const [page, setPage] = useState(1);
  const collection = await getSeriesCollectionByUserId(userId);
  console.log("API Called")
  //console.log(collection.series)

  return (
    <>
    <CollectionContent typeOfCollection="series" collection={collection.series} userId={userId} />
    </>
  )
}

export default SeriesCollection
/* 
<div className="flex flex-col align-center content-center justify-center text-center items-center">
      <h2 className='h2-bold m-8'>Your collection</h2>
      <Tabs defaultValue="movies" className="">
        <TabsList>
          <TabsTrigger value="movies" className='p-4'><div className="flex m-2 gap-2">{tabsIcons.movies}Movies</div></TabsTrigger>
          <TabsTrigger value="series" className='p-4'><div className="flex m-2 gap-2">{tabsIcons.series}Series</div></TabsTrigger>
          <TabsTrigger value="games" className='p-4'><div className="flex m-2 gap-2">{tabsIcons.games}Games</div></TabsTrigger>
          <TabsTrigger value="books" className='p-4'><div className="flex m-2 gap-2">{tabsIcons.books}Books</div></TabsTrigger>
        </TabsList>
        <TabsContent value="movies" className="my-4">
          <CollectionContent typeOfCollection="movies" page={page} setPage={setPage} />
        </TabsContent>
        <TabsContent value="series" className="my-4">Change your password here.</TabsContent>
        <TabsContent value="games" className="my-4">Make changes to your account here.</TabsContent>
        <TabsContent value="books" className="my-4">Change your password here.</TabsContent>
      </Tabs>
    </div> */

    //Pasar la header a una sidebar
    //DONE Usar el searchtags poniendo los elementos como parametros en la barra de busqueda
    //Unificar todas las paginas de SeriesCollection en /discover y todas las de collection en /collection