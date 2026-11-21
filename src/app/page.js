"use client";
import { supabaseClient } from "@/supabase";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Page = () => {
  const supabase = supabaseClient();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getPosts = async () => {
    const response = await supabase
      .from("Posts")
      .select("*, Profile(username, profileImage)");
    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const pushComments = (postId) => {
    router.push(`/comment/${postId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl font-bold text-violet-400 ring-1 ring-violet-500/20">
            +
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Posts
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            See what everyone is sharing
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-xl shadow-black/20 transition-colors hover:border-zinc-700"
              >
                <div className="flex items-center gap-3 p-5">
                  <Avatar className="h-11 w-11 border border-violet-500/20">
                    <AvatarImage src={post.Profile.profileImage} />
                    <AvatarFallback className="bg-violet-500/10 font-semibold text-violet-400">
                      {post.Profile.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">
                      {post.Profile.username}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {formatDistanceToNowStrict(post.created_at, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <div className="h-2 w-2 rounded-full bg-violet-500" />
                </div>

                <div className="bg-zinc-950">
                  <img
                    src={post.ImageUrl}
                    className="max-h-[550px] w-full object-contain"
                  />
                </div>

                <div className="p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                    {post.caption}
                  </p>
                  <MessageCircle onClick={() => pushComments(post.id)} />
                </div>
              </div>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-10 text-center">
            <p className="text-lg font-semibold text-white">No posts yet</p>
            <p className="mt-2 text-sm text-zinc-500">
              Be the first to share something!
            </p>
          </div>
        )}
      </div>
      <Button onClick={() => router.push("/create-post")}>Create post</Button>
    </div>
  );
};

export default Page;
