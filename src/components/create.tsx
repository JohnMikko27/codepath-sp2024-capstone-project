 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Create = () => {
  const [inputs, setInputs] = useState({ title: "", content: ""});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setInputs({...inputs, [name]: value});
  };

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
    if (data.status !== 200) {
      return;
    }
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
        <button type="submit"
          className="border-slate-400 border-solid border-1 px-2 py-1 bg-slate-950 text-blue-300 
        transition-all duration-200 hover:underline rounded-sm"
        >
        Post
        </button>
      </form>
    </div>
  );
};

export default Create;