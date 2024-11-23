 
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingContext } from "@/App";
import LoadingSpinnerModal from "./ui/loadingSpinnerModal";
import { v4 as v4uuid } from "uuid";
import { uploadImage } from "@/utils/utils";
import { socket } from "@/socket";

const Create = () => {
  const [inputs, setInputs] = useState({ title: "", content: "", media: ""});
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setInputs({...inputs, [name]: value});
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setInputs({...inputs, [name]: file});
      }
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.title === "") return;
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const imageId = v4uuid();
    const user = JSON.parse(localStorage.getItem("user")!);
    const response = await fetch(env + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
      body: JSON.stringify({
        ...inputs, 
        media: inputs.media !== "" 
          ?`https://ekcnbalczcqlpckprbce.supabase.co/storage/v1/object/public/hooptalk-media/${user.id}/${imageId}` 
          : ""
      })
    });
    const data = await response.json();
    if (data.status !== 200) {
      return;
    }
    if (inputs.media !== "") {
      uploadImage(user.id, imageId, inputs.media);
    }
    socket.emit("newPost");
    setIsLoading(false);
    toast({ title: data.message, className: "bg-slate-950 text-white" });
    navigate("/");
  };

  useEffect(() => {
    socket.connect();
    return (() => {
      socket.off("newPost");
      socket.disconnect();
    });
  }, []);

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center ">
      { isLoading && <LoadingSpinnerModal />}
      <form onSubmit={handleSubmit} 
        className="flex flex-col border-solid border-slate-400 border-1 p-4 gap-4 rounded-sm w-1/2 bg-white">
        <input type="text" name="title" placeholder="Title" value={inputs.title} 
          onChange={handleChange} className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm"/>
        <textarea name="content" id="content" cols={30} rows={10} placeholder="Description (optional)"
          value={inputs.content} onChange={handleChange} 
          className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm">
        </textarea>
        <Input type="file" name="media" id="media" accept=".png, .jpg, .jpeg" onChange={handleChange}/>
        <div className="flex justify-between gap-4">
          <Button type="button" onClick={() => navigate(-1)}
            className="border-slate-400 border-solid border-1 px-2 py-1 
              transition-all duration-200 hover:underline rounded-sm flex-1">
                Cancel
          </Button>
          <Button type="submit" 
            className="bg-green-700 text-white hover:bg-green-600 flex-1">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;