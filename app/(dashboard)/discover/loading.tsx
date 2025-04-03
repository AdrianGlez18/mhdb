import { Loading } from "@/components/shared/loading";

export default function DiscoverLoading() {
  return (
    <main className="min-h-screen space-y-8 px-4 py-6 md:px-6 lg:px-8 overflow-auto w-full">
      <div className="mx-auto max-w-7xl space-y-8">
        <Loading />
      </div>
    </main>
  );
} 