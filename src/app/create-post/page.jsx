"use client"

import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useState } from "react";

const Page = () => {
    const [file, setFile] = useState(null);
    const supabase = supabaseClient();

    const handleImage = async (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        const response = await supabase.storage.from("POST_IMAGES").upload(`images/${event.target.files[0].name}`, event.target.files[0]);
        
        const {data} = supabase.storage.from("POST_IMAGES").getPublicUrl(`images/${event.target.files[0].name}`)
        console.log(data);
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-200/50">

                <div className="mb-8 text-center">
                   

                    <h1 className="text-2xl font-semibold text-zinc-900">
                        Upload Image
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Choose an image from your device.
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImage(e)}
                        className="h-12 cursor-pointer rounded-lg border-zinc-300 bg-zinc-50 text-sm text-zinc-700 file:mr-3 file:rounded-md file:border-0 file:bg-blue-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-600"
                    />

                    {file && (
                        <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
                            <p className="text-xs text-zinc-500">
                                Selected image
                            </p>
                            <p className="mt-1 truncate text-sm font-medium text-zinc-800">
                                {file.name}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Page;