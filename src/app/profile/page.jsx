"use client"
import { supabaseClient } from "@/supabase"
import { useEffect, useState } from "react";

const Page = () => {
    const supabase = supabaseClient();
    const [userId, setUserId] = useState(null);
    const [infos, setInfos] = useState({});

    const userid = () => {
        const response = localStorage.getItem('username');
        setUserId(response.data)
    }
    // console.log(userId);

const getProfile = async () => {
    const response = await supabase.from("Profile").select().eq('username', userId);
    console.log(response)
    setInfos(response);
}
useEffect(() => {
    userid();
    getProfile();
}, [])


    return(
        <div>
            <p>{infos.status}</p>
        </div>
    )
}
export default Page;