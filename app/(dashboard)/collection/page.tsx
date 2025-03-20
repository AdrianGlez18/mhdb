import CollectionGrid from "@/components/collection/collection-grid";
import { useProfile } from "@/components/context/profile-context";
import { getCollection, getWishlist } from "@/lib/server/discover";
import { Suspense } from "react";

//Todo remove use client and profile
export default async function CollectionPage() {
  const collectionPromise = getCollection();
  const wishlistPromise = getWishlist();

  const [collection, wishlist] = await Promise.all([
    collectionPromise,
    wishlistPromise,
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <CollectionGrid collection={collection} wishlist={wishlist} />
    </Suspense>
  )
}

const Loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-4 w-24 bg-muted rounded" />
      </div>
    </main>
  );
};