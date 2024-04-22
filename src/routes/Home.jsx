import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/client";
import Post from "../components/Post";

const Home = () => {
  const data = useLoaderData();
  const [displayedData, setDisplayedData] = useState([...data]);
  const [input, setInput] = useState("");
  // by default, the latest should be clicked
  // const [clicked, setClicked] = useState("");
  console.log(data);

  const handleClick = async(e) => {
    // console.log("handleLatest clicked");
    if (e.target.textContent === "Latest") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("created_at", { ascending: false });
      setDisplayedData(newData);
    } else if (e.target.textContent === "Popular") {
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
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("submit");
    const { data: newData } = await supabase
      .from("hoop-talk-posts")
      .select()
      .eq("title", input);
    if (newData.length === 0) {
      setDisplayedData([]);
    } else {
      setDisplayedData(newData);  
    }
    setInput("");
  };

  // const 
  return (
    <div className="">
      <div className="flex gap-8">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search post" value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-solid border-black"/>
        </form>
        <button onClick={handleClick} 
          className="border-2 border-solid border-black">
            Latest
        </button>
        <button onClick={handleClick}
          className="border-2 border-solid border-black">
            Popular
        </button>
        <button onClick={handleClick}
          className="border-2 border-solid border-black">
            Oldest
        </button>

      </div>

      {displayedData.length === 0 
        ? <div className=""><i>Post with that title not found!</i></div> 
        : displayedData.map((post) => {
          return (
            <Post key={post.id} title={post.title} 
              date={post.created_at} upvotes={post.upvotes} id={post.id}/>
          );
        })}
    </div>
  );
};

export default Home;
