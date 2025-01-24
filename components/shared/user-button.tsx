"use client"

import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/components/context/profile-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const UserButon = () => {
    const { profile, loading } = useProfile();
    const router = useRouter();
    const supabase = createClient();
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    }

    if (loading) return null;

    const profileImg = profile?.profile === null ? `https://ui-avatars.com/api/?name=${profile?.username}` : profile?.profile.imageUrl;
    return (
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                    <img src={profileImg} alt="avatar" className="w-8 h-8 rounded-full" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
       </DropdownMenu>
    )
}

export default UserButon