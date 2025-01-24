/* import { Sidebar } from "lucide-react" */
import { Metadata } from 'next';

import { DiscoverProvider } from "@/components/context/discover-context"

export const metadata: Metadata = {
    title: "Collection - MHDB",
    description: "Store and organize your favorite content",
  }

export default function DiscoverLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <DiscoverProvider>
        <div className="flex w-full">
          {children}
        </div>
      </DiscoverProvider>
    )
  }