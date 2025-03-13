"use client"

import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/components/context/profile-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import Link from "next/link";

const UserButton = ({displayUsername}: {displayUsername: boolean}) => {
    const { profile, loading } = useProfile();
    const router = useRouter();
    const supabase = createClient();
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    }

    if (loading) return null;

    const profileImg = profile?.profile?.imageUrl === null ? `https://ui-avatars.com/api/?name=${profile?.profile.username}` : profile?.profile.imageUrl;
    return (
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                    <img src={profileImg} alt="avatar" className="w-8 h-8 rounded-full" />
                    {displayUsername && <span className="mx-2 text-sm font-medium capitalize">{profile?.profile.username}</span>}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
       </DropdownMenu>
    )
}

export default UserButton