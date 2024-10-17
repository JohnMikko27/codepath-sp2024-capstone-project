import Post from "@/components/post";
import { useEffect, useState } from "react";
import { PostType } from "@/utils/types";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [posts, setPosts] = useState([]);
  // i'm going to add the filters first then the search bar
  const [filter, setFilter] = useState("latest");
  // so to add the filters im going to have 3 buttons called
  // latest, oldest, popular
  // by default it should be latest
  // i'll probably have to add a query parameter to my request 
  // and then filter the posts based off of the filters
  console.log(filter);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchPosts = async() => {
      const response = await fetch(`http://localhost:3000/posts?sort=${filter}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [filter]);

  return (
    <div className=" px-10 pb-10 grid gap-2">
      <div className="flex gap-2">
        <Button onClick={() => setFilter("latest")}>Latest</Button>
        <Button onClick={() => setFilter("oldest")}>Oldest</Button>
        <Button onClick={() => setFilter("popular")}>Popular</Button>
      </div>
      <div>
        { posts.length > 0 && posts.map((post: PostType, i: number) => {
          return <Post key={i} post={post} />;
        })}
      </div>
    </div>
  );
}