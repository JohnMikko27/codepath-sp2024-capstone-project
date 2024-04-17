import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import supabase from "../utils/client";

const Create = () => {
  const [inputs, setInputs] = useState({title: "", description: "", upvotes: 0, comments: []});
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
    setInputs({title: "", description: "", upvotes: 0, comments: []});
    navigate("/");
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <Form handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs}/>
    </div>
  );
};

export default Create;