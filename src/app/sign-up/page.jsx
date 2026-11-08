"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/toast"

const Page  = () => {
    const supabase = supabaseClient();
    const [user, setUser] = useState({email: "", password: "", username: ""});
    const router = useRouter();

    const signUp = async () => {
        const response = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        })
        if(response.error){
            toast.add({
                title: "Try again",
                description: response.error.message,
                type: "error"
            })
        }
        const userId = response.data.user.id;

        await supabase.from("Profile").insert({
            id: userId,
            username: user.username
        })
        toast.add({
            title: "welcome",
            description: "succesful",
        })
    }
    const handleUser = (event) => {
        if(event.target.name === "email"){
            setUser({...user, email: event.target.value})
        }else if(event.target.name === "password"){
            setUser({...user, password: event.target.value})
        }else{
            setUser({...user, username: event.target.value})
        }
    }


    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 py-10">

            {/* Sign up card */}
            <div className="w-full max-w-[350px] border border-zinc-200 bg-white px-10 py-10">

                <div className="mb-8 text-center">
                    <h1 className="mb-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                        Instagram
                    </h1>

                    <p className="text-sm font-semibold leading-5 text-zinc-500">
                        Sign up to see photos and videos from your friends.
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
                        value={user.username}
                        placeholder="Username"
                        name="username"
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

                    <p className="px-1 pt-2 text-center text-xs leading-4 text-zinc-500">
                        People who use our service may have uploaded your contact information.
                    </p>

                    <Button
                        onClick={signUp}
                        className="h-9 w-full rounded-lg bg-[#0095f6] text-sm font-semibold text-white shadow-none hover:bg-[#1877f2]"
                    >
                        Sign up
                    </Button>

                </div>

                <p className="mt-6 text-center text-xs leading-4 text-zinc-500">
                    By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </p>

            </div>

            {/* Login card */}
            <div className="mt-3 flex w-full max-w-[350px] items-center justify-center gap-1 border border-zinc-200 bg-white py-5 text-sm">
                <span className="text-zinc-700">
                    Have an account?
                </span>

                <button
                    onClick={() => router.push("/logIn")}
                    className="font-semibold text-[#0095f6] hover:text-[#1877f2]"
                >
                    Log in
                </button>
            </div>

            <p className="mt-6 text-xs text-zinc-400">
                © 2026 Instagram-inspired design
            </p>

        </div>
    )
}
export default Page;