import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";
import { Pencil, Trash2 } from "lucide-react";
import supabase from "../utils/client";

const Details = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const deleteData = async() => {
    await supabase
      .from("hoop-talk-posts")
      .delete()
      .eq("id", data[0].id);
    navigate("/");
  };
  return (
    <div>
      <div>{data[0].title}</div>
      <div>{data[0].description}</div>
      <div>{formatDate(data[0].created_at)}</div>
      <div>{data[0].upvotes}</div>
      <Link to={`/edit/${data[0].id}`}>
        <Pencil />
      </Link>
      <Trash2 onClick={deleteData} className=" hover:cursor-pointer"/>
    </div>
  );
};

export default Details;