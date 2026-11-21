"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/toast"

const Page = () => {
    const supabase = supabaseClient();
    const [user, setUser] = useState({email: "", password: "", username: ""});
    const router = useRouter();

    const Login = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })
        if(error){
            toast.add({
                title: "Try again",
                description: response.error.message,
                type: "error"
            })
        }else{
               toast.add({
                title: "welcome back",
                description: "succesful",
                type: "succes"
            })
            router.push("/");
        }
        // console.log(data, error, "this");
    }

    const handleUser = (event) => {
        if(event.target.name === "email"){
            setUser({...user, email: event.target.value})
        }else if(event.target.name === "password"){
            setUser({...user, password: event.target.value})
        }
    }
    const push = () => {
        router.push("/sign-up");
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <div className="w-full max-w-md">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl shadow-black/30">

                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl font-bold text-violet-400 ring-1 ring-violet-500/20">
                            +
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Log in to your account
                        </p>
                    </div>

                    <div className="space-y-5">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Email
                            </label>
                            <Input
                                onChange={(event) => handleUser(event)}
                                value={user.email}
                                placeholder="Enter your email"
                                name="email"
                                className="h-11 border-zinc-700 bg-zinc-950/70 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Password
                            </label>
                            <Input
                                onChange={(event) => handleUser(event)}
                                value={user.password}
                                placeholder="Enter your password"
                                name="password"
                                type="password"
                                className="h-11 border-zinc-700 bg-zinc-950/70 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                            />
                        </div>

                        <Button
                            onClick={Login}
                            className="h-11 w-full bg-violet-600 font-semibold text-white shadow-lg shadow-violet-950/30 transition-all hover:bg-violet-500"
                        >
                            Log in
                        </Button>

                    </div>

                    <div className="mt-7 border-t border-zinc-800 pt-6 text-center">
                        <p className="text-sm text-zinc-400">
                            Don't have an account?{" "}
                            <Button onClick={push}>Sign-up</Button>
                        </p>
                    </div>

                </div>

                <p className="mt-6 text-center text-xs text-zinc-600">
                    © 2026. All rights reserved.
                </p>

            </div>
        </div>
    )
}
export default Page;
