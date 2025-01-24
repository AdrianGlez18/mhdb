"use client"

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { db } from "@/lib/server/db";
import { read } from "fs";
import { useAction } from "@/hooks/useAction";
import { findProfile } from "@/lib/server/actions/profile/read";

const AuthCallbackPage = () => {
    const supabase = createClient();
    const router = useRouter();

    const { execute, fieldErrors } = useAction(findProfile, {
        onSuccess: (data) => {
          console.log("inside onSUccess");
        },
        onError: (error) => {
          console.log("inside onError");
        }
    });
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event, session)
            if (event === 'SIGNED_IN' && session?.user) {
                console.log("inside if")
                /* const { data } = await supabase
                    .from('Profile')
                    .select()
                    .eq('userId', session.user.id); */

                    const data = await execute({ userId: session.user.id });
                    console.log("after execute", data);

                if (data == undefined) router.push('/profile/edit');
                else router.push('/discover');
            }
        });

        return () => subscription?.unsubscribe();
    }, []);
    return <div>Loading...</div>;
};

export default AuthCallbackPage;