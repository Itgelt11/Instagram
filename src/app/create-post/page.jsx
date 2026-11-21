"use client"

import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Toast, toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation";

const Page = () => {
    const [file, setFile] = useState(null);
    const supabase = supabaseClient();
    const [caption, setCaption] = useState("");
    const [imageUrl, setImageUrl] = useState(null); 
    const router = useRouter();

    const handleImage = async (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        const response = await supabase.storage.from("POST_IMAGES").upload(`images/${event.target.files[0].name}`, event.target.files[0]);
        
        const {data} = supabase.storage.from("POST_IMAGES").getPublicUrl(`images/${event.target.files[0].name}`)
        console.log(data);
        setImageUrl(data.publicUrl);
    }

    const handleCaption = (e) => setCaption(e.target.value);

    const createPost = async () => {
        const response = await supabase.from("Posts").insert({
            ImageUrl: imageUrl,
            caption,
        });
        if(response.success){
            toast.add({
                description: "succesfull",
                type: "succes"
            })
            router.push("/");
        }else{
            toast.add({
                description: "Try again",
                type: "error"
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-10">
            <div className="w-full max-w-md">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl shadow-black/30">

                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl font-bold text-violet-400 ring-1 ring-violet-500/20">
                            +
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Create a post
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Share your image with everyone
                        </p>
                    </div>

                    <div className="space-y-5">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Upload image
                            </label>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImage(e)}
                                className="h-12 cursor-pointer border-zinc-700 bg-zinc-950/70 text-sm text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-violet-600 file:px-3 file:py-1 file:text-sm file:font-medium file:text-white hover:file:bg-violet-500"
                            />
                        </div>

                        {file && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-zinc-300">
                                    Image preview
                                </p>

                                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="max-h-64 w-full object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">
                                Caption
                            </label>

                            <Textarea
                                placeholder="Add caption..."
                                value={caption}
                                onChange={(e) => handleCaption(e)}
                                max={100}
                                className="min-h-28 resize-none border-zinc-700 bg-zinc-950/70 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                            />
                        </div>

                        <Button
                            onClick={createPost}
                            className="h-11 w-full bg-violet-600 font-semibold text-white shadow-lg shadow-violet-950/30 transition-all hover:bg-violet-500"
                        >
                            Create post
                        </Button>

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
