
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page  = () => {
    const supabase = supabaseClient();
    const [user, setUser] = useState({email: "", password: "", username: ""});
    const router = useRouter();

    const Login = async () => {
        const response = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })
        router.push("/");
    }
    const handleUser = (event) => {
        if(event.target.name === "email"){
            setUser({...user, email: event.target.value})
        }else if(event.target.name === "password"){
            setUser({...user, password: event.target.value})
        }
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 py-10">

            {/* Login card */}
            <div className="w-full max-w-[350px] border border-zinc-200 bg-white px-10 py-10">

                <div className="mb-10 text-center">
                    <h1 className="mb-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                        Instagram
                    </h1>

                    <p className="text-sm font-semibold leading-5 text-zinc-500">
                        Log in to see photos and videos from your friends.
                    </p>
                </div>

                <div className="space-y-3">

                    <Input
                        onChange={(event) => handleUser(event)}
                        value={user.email}
                        placeholder="Email"
                        name="email"
                        className="h-10 rounded-sm border border-zinc-300 bg-[#fafafa] text-xs shadow-none placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400"
                    />

                    <Input
                        onChange={(event) => handleUser(event)}
                        value={user.password}
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="h-10 rounded-sm border border-zinc-300 bg-[#fafafa] text-xs shadow-none placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400"
                    />

                    <Button
                        onClick={Login}
                        className="mt-3 h-9 w-full rounded-lg bg-[#0095f6] text-sm font-semibold text-white shadow-none hover:bg-[#1877f2]"
                    >
                        Log in
                    </Button>

                </div>

                
            </div>

            {/* Sign-up card */}
            <div className="mt-3 flex w-full max-w-[350px] items-center justify-center gap-1 border border-zinc-200 bg-white py-5 text-sm">

                <span className="text-zinc-700">
                    Don't have an account?
                </span>

                <button
                    onClick={() => router.push("/sign-up")}
                    className="font-semibold text-[#0095f6] hover:text-[#1877f2]"
                >
                    Sign up
                </button>

            </div>

            <p className="mt-6 text-xs text-zinc-400">
                © 2026 Instagram-inspired design
            </p>

        </div>
    )
}
export default Page;