"use client"

import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";


interface Props<T extends FieldValues> {
    type: "SIGN_IN" | "SIGN_UP";
}

const Auth = <T extends FieldValues>({
    type,
}: Props<T>) => {
    const supabase = createClient();
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NODE_ENV === 'production'
                    ? 'https://mhdb.app/auth/callback'
                    : 'http://localhost:3000/auth/callback',
            },
        });
        if (error) console.error('Authentication error', error.message);
    };
    const isSignIn = type === "SIGN_IN";

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col p-4 items-center justify-center gap-4 w-full max-w-md rounded-3xl z-30 bg-black/80 min-h-[70vh] mx-2 lg:mx-4">
                <Image src="/images/logo-header.png" alt="MHDB" width={150} height={750} />
                <h1 className="text-2xl font-semibold text-white my-6 text-center">
                    {isSignIn ? "Welcome back to MHDB!" : "Welcome! Create your account to start your journey"}
                </h1>
                <p className="text-white text-center">
                    {isSignIn
                        ? "Access the vast collection of resources, and stay updated"
                        : "Please complete all fields and upload a valid university ID to gain access to the library"}
                </p>
                <div>
                    <button
                        onClick={signInWithGoogle}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium bg-slate-600 hover:bg-slate-500 transition-all my-6"
                    >
                        <Image src="/images/google.webp" alt="Google" width={20} height={20} />
                        {isSignIn ? "Sign in with Google" : "Sign up with Google"}
                    </button>
                </div>
                <p className="text-center text-white font-medium">
                    {isSignIn ? "New to MHDB? " : "Already have an account? "}

                    <Link
                        href={isSignIn ? "/sign-up" : "/sign-in"}
                        className="font-bold text-primary text-white"
                    >
                        {isSignIn ? "Create an account" : "Sign in"}
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Auth;