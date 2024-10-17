import Post from "@/components/post";
import { useEffect, useState } from "react";
import { PostType } from "@/utils/types";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPosts = async() => {
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className=" px-10 pb-10 grid gap-2">
      { posts.length > 0 && posts.map((post: PostType, i: number) => {
        return <Post key={i} post={post} />;
      })}
    </div>
  );
}