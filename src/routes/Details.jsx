import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";
import { Pencil, Trash2, ThumbsUp } from "lucide-react";
import supabase from "../utils/client";
import { useState } from "react";

const Details = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(data[0].upvotes);

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

  return (
    <div>
      <div>{data[0].title}</div>
      <div>{data[0].description}</div>
      <div>{formatDate(data[0].created_at)}</div>
      <div>{upvotes}</div>
      <ThumbsUp onClick={handleUpvote} className="hover:cursor-pointer"/>
      <Link to={`/edit/${data[0].id}`}>
        <Pencil />
      </Link>
      <Trash2 onClick={deleteData} className=" hover:cursor-pointer"/>
    </div>
  );
};

export default Details;