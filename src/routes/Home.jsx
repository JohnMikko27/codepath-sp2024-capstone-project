import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/client";
import Post from "../components/Post";

const Home = () => {
  const data = useLoaderData();
  const [displayedData, setDisplayedData] = useState([...data]);
  console.log(data);

  const handleClick = async(e) => {
    // console.log("handleLatest clicked");
    if (e.target.textContent === "Latest") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("created_at", { ascending: false });
      setDisplayedData(newData);
    } else if (e.target.textContent === "Upvotes") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("upvotes", { ascending: false });
      setDisplayedData(newData);
    } else if (e.target.textContent === "Oldest") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("created_at", { ascending: true });
      setDisplayedData(newData);
    }
  };

  // const 
  return (
    <div className="">
      <div className="flex gap-8">
        <button onClick={handleClick}>Latest</button>
        <button onClick={handleClick}>Upvotes</button>
        <button onClick={handleClick}>Oldest</button>

      </div>
      {displayedData && displayedData.map((post) => {
        return (
          <Post key={post.id} title={post.title} 
            date={post.created_at} upvotes={post.upvotes} id={post.id}/>
        );
      })}
    </div>
  );
};

export default Home;
