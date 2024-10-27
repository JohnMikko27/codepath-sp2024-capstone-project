import { useLoaderData, useNavigate, } from "react-router-dom";
import { PostType } from "@/utils/types";
import { useState, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import LoadingSpinnerModal from "@/components/ui/loadingSpinnerModal";
import { LoadingContext } from "@/App";


export default function Edit() {
  const postData = useLoaderData() as PostType;
  const [inputs, setInputs] = useState({ title: postData.title, content: postData.content });
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? "https://hooptalk-api-production.up.railway.app" 
    : "http://localhost:3000";
  console.log("edit Environment:", import.meta.env.MODE);
  console.log("edit Is Production:", import.meta.env.PROD);
  console.log("edit API URL:", env);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs({...inputs, [name]: value});
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(env + `/posts/${postData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
        body: JSON.stringify({...inputs})
      });
      const data = await response.json();
      if (data.status !== 200) return;
      setIsLoading(false);
      toast({ title: data.message, className: "bg-slate-950 text-white" });
      navigate(`/details/${postData.id}`);
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center">
      { isLoading && <LoadingSpinnerModal /> }
      <form onSubmit={handleSubmit}
        className="flex flex-col border-solid border-slate-400 border-1 p-4 gap-4
          rounded-sm w-1/2 bg-white"
      >
        <input type="text" name="title" placeholder="Title" value={inputs.title}
          onChange={handleChange} className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm"/>
        <textarea name="content" id="content" cols={30} rows={10} placeholder="content (optional)"
          value={inputs.content} onChange={handleChange}
          className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm">
        </textarea>
        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}
            className="flex-1">
            Cancel
          </Button>
          <Button type="submit"
            className=" bg-green-600 text-white hover:bg-green-500 flex-1">
              Update
          </Button>
        </div>
      </form>
    </div>
  );
}