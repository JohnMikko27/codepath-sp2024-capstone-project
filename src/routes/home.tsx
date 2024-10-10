/* eslint-disable @typescript-eslint/no-explicit-any */
import Post from "@/components/post";
import { useEffect, useState } from "react";

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

  //   create post types
  return (
    <div>
      { posts.map((post: any, i: number) => {
        return <Post key={i} id={post.authorId} title={post.title} createdAt={post.createdAt}
          content={post.content} username={post.author.username} upvotes={0}

        />;
      })}
    </div>
  );
}