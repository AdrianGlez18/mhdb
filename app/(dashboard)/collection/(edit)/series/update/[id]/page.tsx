import EditMovieForm from "@/components/collection/edit-media-form";
import { getCollectionItemById } from "@/lib/server/discover";
import { notFound } from "next/navigation";

interface AddMoviePageProps {
  params: {
    id: string;
  };
}

export default async function UpdateSeriesPage({ params }: AddMoviePageProps) {
  const { id } = params;
  const series = await getCollectionItemById(id, "series");

  if (!series) {
    return notFound();
  }

  const defaultValues = {
    apiId: id,
    title: series.title,
    imageUrl: series.imageUrl,
    overview: series.overview === null ? undefined : series.overview,
    timesWatched: series.timesWatched,
    isFavorited: series.isFavorited,
    isOwned: series.isOwned,
    isWatching: series.isWatching,
    plainTags: series.tags.join(","),
    notes: series.notes === null ? undefined : series.notes,
    userRating: series.userRating === null ? undefined : series.userRating,
    releaseYear: series.releaseYear === null ? undefined : series.releaseYear,
    contentType: series.contentType,
    watchLog: Array.isArray(series.watchLog) ? series.watchLog.map(({ startDate, endDate, ...rest }) => ({ startDate: startDate || undefined, endDate: endDate || undefined, ...rest })) : [],
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-2xl">
        <EditMovieForm
          action="update"
          mediaType="series"
          defaultValues={defaultValues}
        />
      </div>
    </main>
  );
}
