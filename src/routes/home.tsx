import Post from "@/components/post";
import { useEffect, useState, useContext } from "react";
import { PostType } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinnerModal  from "@/components/ui/loadingSpinnerModal";
import { LoadingContext } from "@/App";
import { useDebounce } from "use-debounce";
import { socket } from "@/socket";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filter, setFilter] = useState("latest");
  const [input, setInput] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [debouncedInput] = useDebounce(input, 1000);
  
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;
  
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      let url = env + "/posts";
      if (debouncedInput) {
        url += `?search=${debouncedInput}`;
      } else if (filter) {
        url += `?sort=${filter}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      setPosts(data);
    };

    const intervalId = setTimeout(() => {
      fetchPosts();
    }, 500);

    return (() => {
      clearTimeout(intervalId);
    });

  }, [debouncedInput, filter]);

  useEffect(() => {
    socket.connect();
    return (() => {
      socket.disconnect();
    });
  }, []);

  useEffect(() => {
    socket.on("allPosts", (data: PostType[]) => {
      setPosts([...data]);
    });
    return (() => {
      socket.off("allPosts");
    });
  }, []);

  return (
    <div className={"px-10 pb-10 grid gap-4"} >
      <div className="flex gap-6">
        <Input onChange={handleChange} value={input} placeholder="Search" 
          className="flex-[.4]" aria-label="Search input">
        </Input>
        <div className="flex gap-2">
          <Button onClick={() => setFilter("latest")} aria-label="Latest posts filter">Latest</Button>
          <Button onClick={() => setFilter("oldest")} aria-label="Oldest posts filter">Oldest</Button>
          <Button onClick={() => setFilter("popular")} aria-label="Most popular posts filter">Popular</Button>
        </div>
      </div>
      <div className="grid gap-2">
        { isLoading 
          ? <LoadingSpinnerModal /> 
          : posts.length > 0 && posts.map((post: PostType, i: number) => {
            return <Post key={i} post={post} />;
          })}
      </div>
    </div>
  );
}