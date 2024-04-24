import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";
import { Pencil, Trash2, ThumbsUp } from "lucide-react";
import supabase from "../utils/client";
import { useState } from "react";

const Details = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(data[0].upvotes);
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([...data[0].comments]);
  
  const deleteData = async() => {
    await supabase
      .from("hoop-talk-posts")
      .delete()
      .eq("id", data[0].id);
    navigate("/");
  };

  const handleUpvote = async() => {
    const { data: updatedData } = await supabase
      .from("hoop-talk-posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", data[0].id)
      .select();

    // syncs db and upvotes state because it will only update upvotes after the db has been updated
    if (updatedData && updatedData.length > 0) {
      setUpvotes(updatedData[0].upvotes);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleComment = async(e) => {
    e.preventDefault();
    console.log("handleComment");
    if (comment === "") return;
    
    // to get the latest comments
    const { data: updatedData } = await supabase
      .from("hoop-talk-posts")
      .select()
      .eq("id", data[0].id);
    console.log(updatedData);

    const { data: commentsData } = await supabase
      .from("hoop-talk-posts")
      .update({ comments: [...(updatedData[0].comments || []), comment] })
      .eq("id", data[0].id)
      .select();

    setCommentsArr([...commentsData[0].comments]);
    setComment("");
  };

  return (
    <div className="flex flex-col row-start-2 row-end-8 gap-4 
    px-8 py-4 rounded-sm ">
      <div className="bg-slate-100 border-1 border-slate-100 border-solid flex flex-col px-4 py-2 gap-4">
        <div className="text-xs text-gray-400">{formatDate(data[0].created_at)}</div>
        <div className="text-xl font-semibold">{data[0].title}</div>
        <div>{data[0].description}</div>
        <div className="flex items-center justify-end gap-4">
          <div className="flex justify-center items-center gap-1">
            <div>{upvotes}</div>
            <ThumbsUp onClick={handleUpvote} className="hover:cursor-pointer"/>
          </div>
          <div className="flex gap-4">
            <Link to={`/edit/${data[0].id}`}>
              <Pencil />
            </Link>
            <Trash2 onClick={deleteData} className=" hover:cursor-pointer"/>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleComment} className="grid gap-2">
          <input type="text" value={comment} onChange={handleChange} placeholder="Add a comment" 
            className=" h-12 border-1 border-slate-400 border-solid px-4 py-2 rounded-3xl"/>
          <button type="submit" 
            className=" px-4 py-2 border-1 border-slate-400 border-solid hover:underline
          rounded-md bg-slate-950 text-blue-300 transition-all duration-200">
            Comment
          </button>
        </form>
      </div>
      <div className="grid gap-2 ">
        {commentsArr.map((comm, i) => {
          return (
            <div 
              className="bg-white border-1 border-gray-400 border-solid px-2 py-1 rounded-md"
              key={i}>{comm}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// maybe i should put comments in a different table so that I can have comments 
// and the number of upvotes of that comment

export default Details;