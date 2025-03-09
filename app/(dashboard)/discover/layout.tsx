/* import { Sidebar } from "lucide-react" */
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Discover - MHDB",
    description: "Store and organize your favorite content",
  }

export default function DiscoverLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex w-full">
          {children}
        </div>
    )
  }