"use client"

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAction } from "@/hooks/useAction";
import { findProfile } from "@/lib/server/actions/profile/read";

const AuthCallbackPage = () => {
    const supabase = createClient();
    const router = useRouter();

    const { execute } = useAction(findProfile, {
        onSuccess: () => {
            router.push('/discover');
        },
        onError: (error) => {
            console.log(error);
        }
    });
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                await execute({ userId: session.user.id });
                router.push('/profile/edit')
            }
        });

        return () => subscription?.unsubscribe();
    }, []);
    return <div>Loading...</div>;
};

export default AuthCallbackPage;