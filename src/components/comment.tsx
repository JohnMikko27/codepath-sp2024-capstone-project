import { CommentType } from "@/utils/types";
import React, { useState, useEffect } from "react";
import { DateTime as dt } from "ts-luxon";
import { UserType } from "@/utils/types";
import { ThumbsUp, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// might have to implement this comment component differently because I'm passing down a setState 
export default function Comment({ comment, postId, handleDeleteComment } 
  : { comment: CommentType, postId: number, handleDeleteComment: (id: number) => void }) {
  const [author, setAuthor] = useState<UserType>({id: 0, username: "", password: "", createdAt: "", posts: [], comments: []});
  const [comm, setComm] = useState(comment);
  const formattedDate = dt.fromISO(comm.createdAt).toLocaleString(dt.DATE_SHORT);
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(comm.content);
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  useEffect(() => {
    let first = true;
    const fetchAuthor = async() => {
      const token = localStorage.getItem("token");
      const response = await fetch(env + `/users/${comm.authorId}`, {
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

  const handleDelete = async() => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(env + `/posts/${postId}/comments/${comm.id}`, {
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
      handleDeleteComment(comm.id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async(e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(env + `/posts/${postId}/comments/${comm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        }, 
        body: JSON.stringify({ content: input })
      });
      const data = await response.json();
      if (data.status !== 200) {
        return;
      }
      toast({ title: data.message, className: "bg-slate-950 text-white" });
      setIsEdit(false);
      setComm({...data.comment});
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpvote = async() => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(env + `/posts/${postId}/comments/${comm.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        }, 
      });
      const data = await response.json();
      if (data.status !== 200) {
        return;
      }
      setComm({ ...data.comment });
    } catch(e) {
      console.log(e);
    }
  };

  return(
    <div className="grid gap-1 bg-white border-1 border-gray-400 border-solid 
    px-4 py-2 rounded-md"
    >
      <div className="flex justify-between text-xs text-gray-400">
        <p>{author && author.username}</p>
        <p>{formattedDate}</p>
      </div>
      {
        !isEdit 
          ?
          <div className="flex justify-between">
            <p>{comm.content}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp 
                  onClick={handleUpvote} 
                  className="hover:cursor-pointer" 
                  tabIndex={0}
                  aria-label="Upvote comment button"
                  fill={`${comm.usersLiked.includes(JSON.parse(localStorage.getItem("user")!).id) 
                    ? "#3452eb"
                    : "white"}`}
                />
                <p>{comm.upvotes}</p>
              </div>
              { comm.authorId === currentUser.id &&
                <div className="flex gap-4">
                  <Pencil
                    size={18}
                    onClick={() => setIsEdit(true)}
                    className="hover:cursor-pointer"
                    tabIndex={0}
                    aria-label="Edit comment button"
                  />
                
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2
                        size={18}
                        className="hover:cursor-pointer"
                        aria-label="Delete comment button"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your comment
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              }
            </div>
          </div>
          : 
          <form className="flex flex-col gap-2" onSubmit={handleEdit} role="form" aria-label="Edit comment form">
            <Input value={input} onChange={(e) => setInput(e.target.value)} aria-label="Comment input"/>
            <div className="flex justify-end gap-1">
              <Button type="button" variant={"outline"} onClick={() => setIsEdit(false)}
                aria-label="Cancel comment button"
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleEdit} aria-label="Submit comment button">Submit</Button>
            </div>
          </form>
      }
    </div>
  );
}