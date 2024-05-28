import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/client";
import Post from "../components/Post";
import { fuzzySearch } from "../utils/utils";

const Home = () => {
  const data = useLoaderData();
  const [displayedData, setDisplayedData] = useState([...data]);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState("");
  const [searches, setSearches] = useState([]);

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

  /*
  maybe make a handleSearch and use it for the search post input
  everytime the user types something in, it will call fuzzySearch with the current input as the parameter
  this function has to be async
  when the displayed list is shown, make sure it isnt too big 
  and that it's overflow is hidden and you can scroll through it
  also, if user's click on one of the fuzzySearch options, i have to make it so that the 
  search input becomes that value
  */
  const handleSearch = async(e) => {
    setInput(e.target.value);
    console.log(e.target.value);

    if (e.target.value === "") {
      setDisplayedData([...data]);
      setSearches([]);
      return;
    }
    
    const searchesData = await fuzzySearch(e.target.value);
    console.log(searchesData);
    setSearches(searchesData);
  };
  
  // i think ive finsihed fuzzySearch but just make sure
  // then check the comments above
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { data: newData } = await supabase
      .from("hoop-talk-posts")
      .select()
      .eq("title", input);
    if (newData.length === 0) {
      setDisplayedData([]);
      setTimeout(() => {
        setDisplayedData([...data]);
      }, 2500);
    } else {
      setDisplayedData(newData);  
      setSearches([]);
    }
    console.log("handlesubmit");
  };

  return (
    <div className="px-20 flex flex-col gap-4 row-start-2 row-end-8">
      <div className="flex gap-8 items-center">
        <form onSubmit={handleSubmit} className="relative">
          <input type="text" placeholder="Search post" value={input}
            onChange={handleSearch}
            className=" border-1 border-solid border-slate-400 rounded-sm px-2 py-1"
          />
          
          <div className="absolute top-8 bg-white border-1 border-slate-400 ">
            {searches.map((search, i) => {
              return (
                <div key={i} onClick={() => setInput(search.item.title)} className="p-2 border-t-slate-400 border-1 hover:bg-slate-200 
                hover:cursor-pointer">
                  {search.item.title}
                </div>
              );
            })}
          </div>
        </form>
        <button onClick={handleClick} 
          className={`${clicked === "Latest" ? "bg-blue-300": "bg-white"} border-1 border-solid 
          border-slate-400 rounded-sm px-2 py-1 
          hover:bg-slate-950 hover:text-blue-300 transition-all duration-200`}>
            Latest
        </button>
        <button onClick={handleClick}
          className={`${clicked === "Popular" ? "bg-blue-300": "bg-white"} border-1 border-solid 
          border-slate-400 rounded-sm px-2 py-1 hover:bg-slate-950 hover:text-blue-300 
          transition-all duration-200`}>
            Popular
        </button>
        <button onClick={handleClick}
          className={`${clicked === "Oldest" ? "bg-blue-300": "bg-white"}  border-1 border-solid 
          border-slate-400 rounded-sm px-2 py-1 hover:bg-slate-950 hover:text-blue-300 
          transition-all duration-200`}>
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
