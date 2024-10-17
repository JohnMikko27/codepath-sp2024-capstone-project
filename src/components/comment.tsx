/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentType } from "@/utils/types";
import { useState, useEffect } from "react";
import { DateTime as dt } from "ts-luxon";

export default function Comment({ comment } : { comment: CommentType }) {
  const [author, setAuthor] = useState() as any;
  const formattedDate = dt.fromISO(comment.createdAt).toLocaleString(dt.DATE_SHORT);
  
  useEffect(() => {
    let first = true;
    const fetchAuthor = async() => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/users/${comment.authorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
      });
      const data = await response.json();
      setAuthor(data);
    };
    if (first) {
      fetchAuthor();
    }

    return (() => {
      first = false;
    });
  }, []);
     
  return(
    <div className="grid gap-1 bg-white border-1 border-gray-400 border-solid px-4 py-2 rounded-md">
      <div className="flex justify-between text-xs text-gray-400">
        <div>{author && author.username}</div>
        <div>{formattedDate}</div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
}