import Post from "@/components/post";
import { useEffect, useState } from "react";
import { PostType } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("latest");
  const [input, setInput] = useState("");

  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      let url = "http://localhost:3000/posts";
      if (input) {
        url += `?search=${input}`;
      } else if (filter) {
        url += `?sort=${filter}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    };

    const intervalId = setTimeout(() => {
      fetchPosts();
    }, 500);

    return (() => {
      clearTimeout(intervalId);
    });

  }, [input, filter]);

  return (
    <div className=" px-10 pb-10 grid gap-4">
      <div className="flex gap-6">
        <Input onChange={handleChange} value={input} placeholder="Search" className=" flex-[.4]"></Input>
        <div className="flex gap-2">
          <Button onClick={() => setFilter("latest")}>Latest</Button>
          <Button onClick={() => setFilter("oldest")}>Oldest</Button>
          <Button onClick={() => setFilter("popular")}>Popular</Button>
        </div>
      </div>
      <div className="grid gap-2">
        { posts.length > 0 && posts.map((post: PostType, i: number) => {
          return <Post key={i} post={post} />;
        })}
      </div>
    </div>
  );
}