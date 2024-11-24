import { CommentType } from "@/utils/types";
import { useState, useEffect } from "react";
import { DateTime as dt } from "ts-luxon";
import { UserType } from "@/utils/types";
import { /*Pencil,*/ Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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


export default function Comment({ comment, postId } : { comment: CommentType, postId: number }) {
  const [author, setAuthor] = useState<UserType>({id: 0, username: "", password: "", createdAt: "", posts: [], comments: []});
  const formattedDate = dt.fromISO(comment.createdAt).toLocaleString(dt.DATE_SHORT);
  const navigate = useNavigate();
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  useEffect(() => {
    let first = true;
    const fetchAuthor = async() => {
      const token = localStorage.getItem("token");
      const response = await fetch(env + `/users/${comment.authorId}`, {
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
      const response = await fetch(env + `/posts/${postId}/comments/${comment.id}`, {
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
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  };
     
  return(
    <div className="grid gap-1 bg-white border-1 border-gray-400 border-solid 
    px-4 py-2 rounded-md"
   
    >
      <div className="flex justify-between text-xs text-gray-400">
        <div>{author && author.username}</div>
        <div>{formattedDate}</div>
      </div>
      <div className="flex justify-between">
        <div>{comment.content}</div>
        <div className="flex items-center gap-4">
          {/* <Pencil size={18} onClick={} /> */}
          { 
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2 size={18}  className="hover:cursor-pointer"/>
                
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
          }
        </div>
      </div>
    </div>
  );
}