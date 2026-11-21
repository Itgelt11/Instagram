"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { Content } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

    const [comments, setComments] = useState("");
    const [gotComments, setGotComments] = useState([]);
    const supabase = supabaseClient();
    const params = useParams();
    const postId = params.postId;

    const addComment = async () => {
        const response = await supabase.from("comments").insert({
            postId: postId,
            content: comments,
        })

    }
    const getComments = async () => {
        const response = await supabase.from("comments").select("*").eq("postId", postId);
        setGotComments(response.data)
        console.log(gotComments)
    }

    useEffect(() => {
        getComments();
    }, [])
    return(
        <div>
            {gotComments.map((comment) => {
                return(
                    <div key={comment.id}>
                        <p>{comment.content}</p>
                    </div>
                )
            })}
            <Input onChange={(e) => setComments(e.target.value)} value={comments}/>
            <Button onClick={addComment}> Add comment</Button>
        </div>
    )
}
export default Page;