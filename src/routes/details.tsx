import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { ThumbsUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { PostType } from "@/utils/types";
import Comment  from "../components/comment";
import { DateTime as dt } from "ts-luxon";

export default function Details() {
  const postData = useLoaderData() as PostType;
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([...postData.comments]);
  const navigate = useNavigate();
  const formattedDate = dt.fromISO(postData.createdAt).toLocaleString(dt.DATE_SHORT);
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleComment = async(e: React.FormEvent) => {
    e.preventDefault();
    if (comment === "") return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/posts/${postData.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
        body: JSON.stringify({ content: comment})
      });
      
      const data = await response.json();
      if (data.status === 200) {
        setCommentsArr([...commentsArr, data.comment]);
        setComment("");
        navigate(`/details/${postData.id}`);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async() => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/posts/${postData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        }
      });
      const data = await response.json();
      if (data.status === 200) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpvote = async() => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/posts/${postData.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        }
      });
      const data = await response.json();
      if (data.status !== 200) {
        return;
      }
      navigate(`/details/${postData.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="flex flex-col row-start-2 row-end-8 gap-4 
    px-8 py-4">
      <div className="bg-slate-100 border-1 border-slate-100 border-solid flex flex-col px-4 py-2 gap-4 rounded-sm">
        <div className="flex justify-between">
          <div className="text-md text-gray-400">Posted by: {postData.author.username}</div>
          <div className="text-md text-gray-400">{formattedDate}</div>
        </div>
        <div className="text-2xl font-semibold">{postData.title}</div>
        <div className="text-xl">{postData.content}</div>
        <div className="flex items-center justify-end gap-4">
          <div className={"flex justify-center items-center gap-1 "}>
            <ThumbsUp className="hover:cursor-pointer" 
              color="black"
              fill={localStorage.getItem("user") 
                && postData.usersLiked.includes(JSON.parse(localStorage.getItem("user")!).id) 
                ? "#3452eb" : "white"}
              onClick={handleUpvote}
            />
            <div>{postData.upvotes}</div>
          </div>
          <div className={`gap-4 ${postData.authorId !== currentUser.id ? "hidden" : "flex"}`}>
            {postData && 
            <Link to={`/edit/${postData.id}`}>
              <Pencil />
            </Link>}
            {postData && 
            <Trash2 onClick={handleDelete} className=" hover:cursor-pointer"/>}
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
        {commentsArr.map((comment, i) => {
          return (
            <Comment key={i} comment={comment} />
          );
        })}
      </div>
    </div>
  );
};
