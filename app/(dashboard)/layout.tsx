/* import { Sidebar } from "lucide-react" */
import { Metadata } from 'next';
import { Toaster } from 'sonner';

import { ProfileProvider } from "@/components/context/profile-context"
import Header from '@/components/shared/header';

export const metadata: Metadata = {
    title: "Collection - MHDB",
    description: "Store and organize your favorite content",
  }

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
  
      <ProfileProvider>
        <div className="flex flex-col min-h-screen">
          {/* <Sidebar /> */}
          <Header />
          {children}
          <Toaster />
        </div>
      </ProfileProvider>
    )
  }