import Form from "../components/Form";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import supabase from "../utils/client";

const Edit = () => {
  const data = useLoaderData();
  const [inputs, setInputs] = useState({title: data[0].title, 
    description: data[0].description, upvotes: data[0].upvotes});
  console.log(data);
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
      .update({ ...inputs })
      .eq("id", data[0].id);
    setInputs({title: "", description: ""});
    navigate("/");
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center ">
      <Form handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs}/>
      
    </div>
  );
};

export default Edit;