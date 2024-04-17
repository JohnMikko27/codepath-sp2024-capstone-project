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

    // to get the latest comments
    const { data: updatedData } = await supabase
      .from("hoop-talk-posts")
      .select();

    const { data: commentsData } = await supabase
      .from("hoop-talk-posts")
      .update({ comments: [...(updatedData[0].comments || []), comment] })
      .eq("id", data[0].id)
      .select();

    setCommentsArr([...commentsData[0].comments]);
    setComment("");
  };

  return (
    <div className="flex flex-col border-2 border-black border-solid row-start-2 row-end-8">
      <div className="border-2 border-black border-solid flex ">
        <div>{data[0].title}</div>
        <div>{data[0].description}</div>
        <div>{formatDate(data[0].created_at)}</div>
        <div>{upvotes}</div>
        <div>
          <ThumbsUp onClick={handleUpvote} className="hover:cursor-pointer"/>
          <Link to={`/edit/${data[0].id}`}>
            <Pencil />
          </Link>
          <Trash2 onClick={deleteData} className=" hover:cursor-pointer"/>
        </div>
      </div>
      <div>
        <form onSubmit={handleComment}>
          <input type="text" value={comment} onChange={handleChange} placeholder="Add a comment" className=""/>
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className="grid gap-2">
        {commentsArr.map((comm, i) => {
          return (
            <div className="border-2 border-black border-solid" key={i}>{comm}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;