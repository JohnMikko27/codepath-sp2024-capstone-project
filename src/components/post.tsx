 
import { PostType } from "@/utils/types";
import { Link } from "react-router-dom";
import { DateTime as dt } from "ts-luxon";
import { ThumbsUp } from "lucide-react";

export default function Post( { post } : { post: PostType }) {
  const formattedDate = dt.fromISO(post.createdAt).toLocaleString(dt.DATE_SHORT);

  return (
    <div className=" border-slate-300 border-solid border-1 bg-white 
        px-8 py-4 rounded-sm ">
      <Link className="post-link" to={`/details/${post.id}`}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">Posted by: {post.author.username}</div>
          <div className=" text-xs text-gray-400">{formattedDate}</div>
        </div>
        <div className="text-xl">{post.title}</div>
        <div className="flex items-center gap-1">
          <ThumbsUp size={16}
            color="black"
            fill={localStorage.getItem("user") 
            && post.usersLiked.includes(JSON.parse(localStorage.getItem("user")!).id) 
              ? "#3452eb" : "white"}
          />
          <div> {post.upvotes}</div>
        </div>
      </Link>
    </div>
  );

}