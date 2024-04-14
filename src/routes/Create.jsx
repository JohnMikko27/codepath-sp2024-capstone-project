import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/client";

const Create = () => {
  const [inputs, setInputs] = useState({title: "", description: ""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`name is: ${name} and value is ${value}`);
    setInputs({...inputs, [name]: value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await supabase
      .from("hoop-talk-posts")
      .insert({ ...inputs });
    setInputs({title: "", description: "", upvotes: 0});
    navigate("/");
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} 
        className="flex flex-col border-solid border-black border-2 p-4">
        <input type="text" name="title" placeholder="Title" value={inputs.title} 
          onChange={handleChange} className="border-black border-solid border-2"/>
        <textarea name="description" id="description" cols="30" rows="10" 
          value={inputs.description} onChange={handleChange} 
          className="border-black border-solid border-2">
        </textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Create;