import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { ThumbsUp, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { PostType } from "@/utils/types";
import Comment  from "../components/comment";
import { DateTime as dt } from "ts-luxon";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { socket } from "@/socket";

export default function Details() {
  const postLoaderData = useLoaderData() as PostType;
  const [postData, setPostData] = useState(postLoaderData);
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([...postData.comments]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const formattedDate = dt.fromISO(postData.createdAt).toLocaleString(dt.DATE_SHORT);
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  
  const handleComment = async(e: React.FormEvent) => {
    e.preventDefault();
    if (comment === "") return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(env + `/posts/${postData.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
        body: JSON.stringify({ content: comment })
      });
     
      const data = await response.json();
      if (data.status !== 200) {
        return;
      }

      socket.emit("submitComment", { postId: postData.id });
      setCommentsArr([...commentsArr, data.comment]);
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async() => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(env + `/posts/${postData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        }
      });
      const data = await response.json();
      if (data.status !== 200) {
        return;
      }
      toast({ title: data.message, className: "bg-slate-950 text-white" });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpvote = async() => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(env + `/posts/${postData.id}/like`, {
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
      setPostData({...data.post});
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteComment = (id: number) => {
    setCommentsArr((commentsArr) => commentsArr.filter((c) => c.id !== id));
  };
  
  useEffect(() => {
    socket.connect();
    return (() => {
      socket.disconnect();
    });
  }, []);

  useEffect(() => {
    socket.on("allComments", (data) => {
      setCommentsArr([...data]);
    });
    return (() => {
      socket.off("submitComment");
      socket.off("allComments");
    });
  }, []);

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
        { 
          postData.imgUrl && <img src={postData.imgUrl} alt={`Image uploaded by ${postData.author.username}`} 
            className="w-32"
          /> 
        }
        <div className="flex items-center justify-end gap-4">
          <div className={"flex justify-center items-center gap-1 "}>
            <ThumbsUp className="hover:cursor-pointer" 
              color="black"
              fill={localStorage.getItem("user") 
                && postData.usersLiked.includes(JSON.parse(localStorage.getItem("user")!).id) 
                ? "#3452eb" : "white"}
              onClick={handleUpvote}
              aria-label="Like post button"
              tabIndex={0}
            />
            <div>{postData.upvotes}</div>
          </div>
          <div className={`gap-4 ${postData.authorId !== currentUser.id ? "hidden" : "flex"}`}>
            {postData && 
            <Link to={`/edit/${postData.id}`} aria-label="Edit post button">
              <Pencil />
            </Link>}
            {postData && 
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2 className="hover:cursor-pointer" aria-label="Delete post button"/>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your post
                  and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            }
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleComment} className="grid gap-2" role="form" aria-label="Create comment form"> 
          <input type="text" value={comment} onChange={handleChange} 
            placeholder="Add a comment" aria-label="Comment input"
            className=" h-12 border-1 border-slate-400 border-solid px-4 py-2 rounded-3xl"/>
          <Button type="submit" aria-label="Submit comment button">Comment</Button>
        </form>
      </div>
      <div className="grid gap-2 ">
        {commentsArr.length > 0 && commentsArr.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} postId={postData.id} 
              handleDeleteComment={handleDeleteComment}
            />
          );
        })}
      </div>
    </div>
  );
};
