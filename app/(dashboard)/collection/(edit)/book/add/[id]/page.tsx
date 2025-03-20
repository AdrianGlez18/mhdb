import EditBookForm from "@/components/collection/edit-media-form"


interface AddBookPageProps {
  params: {
    id: string
  }
}

export default async function AddBookPage({ params }: AddBookPageProps) {
  const { id } = params
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, { cache: 'no-store' })
  const bookInfo = await response.json()
  const { volumeInfo } = bookInfo
  console.log("info: ", bookInfo)
  
  const defaultValues = {
    apiId: id,
    title: volumeInfo.title,
    imageUrl: volumeInfo.imageLinks.thumbnail,
    overview: volumeInfo.description,
    author: volumeInfo.authors[0],
    timesWatched: 0,
    isFavorited: false,
    isOwned: false,
    isWatching: false,
    tags: [],
    notes: "",
    userRating: 0,
    releaseYear: parseInt(volumeInfo.publishedDate.slice(0, 4)),
    startedWatching: undefined,
    completedWatching: undefined,
    contentType: "book"
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
         <EditBookForm action="add" mediaType="book" defaultValues={defaultValues} /> 
      </div>
    </main>
  )
}

