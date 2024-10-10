/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";

export default function Post({ title, content, createdAt, upvotes, id, username }: { title: string, content: string, createdAt: string, upvotes: number, id: number, username: string }) {
  return (
    <div className="post border-gray-400 border-solid border-1 bg-white 
        px-8 py-4 rounded-sm ">
      <Link className="post-link" to={`/details/${id}`}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">Posted by: {username}</div>
          {/* <div className=" text-xs text-gray-400">{formatDate(date)}</div> */}
        </div>
        <div className="text-xl">{title}</div>
        {/* <div>{description}</div> */}
        <div>upvotes: {upvotes}</div>
      </Link>
    </div>
  );

}