import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/client";
import Post from "../components/Post";

const Home = () => {
  const data = useLoaderData();
  const [displayedData, setDisplayedData] = useState([...data]);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState("");
  console.log(data);

  const handleClick = async(e) => {
    // console.log("handleLatest clicked");
    if (e.target.textContent === "Latest") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("created_at", { ascending: false });
      setDisplayedData(newData);
      setClicked("Latest");
    } else if (e.target.textContent === "Popular") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("upvotes", { ascending: false });
      setDisplayedData(newData);
      setClicked("Popular");
    } else if (e.target.textContent === "Oldest") {
      const { data: newData } = await supabase
        .from("hoop-talk-posts")
        .select()
        .order("created_at", { ascending: true });
      setDisplayedData(newData);
      setClicked("Oldest");
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

  // const h = async() => {

  //   const { data: { user } } = await supabase.auth.getUser();
  //   console.log(user);
  // };
  // h();
  // might need to add usernames?? so that I can put who created which post and who commented
  return (
    <div className="px-20 flex flex-col gap-4 row-start-2 row-end-8">
      <div className="flex gap-8 items-center">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search post" value={input} 
            onChange={(e) => setInput(e.target.value)}
            className=" border-1 border-solid border-slate-400 rounded-sm px-2 py-1"/>
        </form>
        <button onClick={handleClick} 
          className={`${clicked === "Latest" ? "bg-blue-300": "bg-white"} border-1 border-solid border-slate-400 rounded-sm px-2 py-1 
          hover:bg-slate-950 hover:text-blue-300 transition-all duration-200`}>
            Latest
        </button>
        <button onClick={handleClick}
          className={`${clicked === "Popular" ? "bg-blue-300": "bg-white"} border-1 border-solid border-slate-400 rounded-sm px-2 py-1 
          hover:bg-slate-950 hover:text-blue-300 transition-all duration-200`}>
            Popular
        </button>
        <button onClick={handleClick}
          className={`${clicked === "Oldest" ? "bg-blue-300": "bg-white"}  border-1 border-solid border-slate-400 rounded-sm px-2 py-1 
          hover:bg-slate-950 hover:text-blue-300 transition-all duration-200`}>
            Oldest
        </button>
      </div>

      <div className="grid overflow-hidden overflow-y-scroll gap-2 ">
        {displayedData.length === 0
          ? <div className=""><i>Post with that title not found!</i></div>
          : displayedData.map((post) => {
            return (
              <Post key={post.id} title={post.title} username={post.username}
                date={post.created_at} upvotes={post.upvotes} id={post.id}/>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
