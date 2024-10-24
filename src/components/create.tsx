 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/utils/client";
// import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const [inputs, setInputs] = useState({ title: "", content: "", media: ""});
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // might have to add my jwt scret into supabase 
  // and might have to change to something longer because it needs to be 32 characters long

  const handleSubmit = async(e: React.FormEvent) => {
    if (inputs.title === "") return;
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
      body: JSON.stringify({...inputs})
    });
    const data = await response.json();
    console.log(data);
    if (data.status !== 200) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user")!);
    const { data: mediaFile, error } = await supabase
      .storage
      .from("hooptalk-media")
      .upload(user.id + "/" + data.post.id, inputs.media);
    
    console.log(mediaFile);
    if (error) console.log(error);
    toast({ title: data.message, className: "bg-slate-950 text-white" });
    navigate("/");
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center ">
      <form onSubmit={handleSubmit} 
        className="flex flex-col border-solid border-slate-400 border-1 p-4 gap-4 rounded-sm w-1/2 bg-white">
        <input type="text" name="title" placeholder="Title" value={inputs.title} 
          onChange={handleChange} className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm"/>
        <textarea name="content" id="content" cols={30} rows={10} placeholder="Description (optional)"
          value={inputs.content} onChange={handleChange} 
          className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm">
        </textarea>
        <Input type="file" name="media" id="media" accept="*" onChange={handleChange}/>
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