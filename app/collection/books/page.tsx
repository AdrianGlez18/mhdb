import BookCollectionContent from "@/components/shared/collection/BookCollectionContent";
import { getBookCollectionByUserId } from "@/lib/actions/bookCollection.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Collection = async () => {

  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const collection = await getBookCollectionByUserId(userId);

  return (
    <>
      <BookCollectionContent collection={collection.books} userId={userId} />
    </>
  )
}

export default Collection
