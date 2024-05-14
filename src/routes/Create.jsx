import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Form from "../components/Form";
import supabase from "../utils/client";

const Create = () => {
  const userData = useLoaderData();
  const [inputs, setInputs] = useState({title: "", description: "", upvotes: 0, comments: [], userId: userData.id});
  const navigate = useNavigate();

  // const h = async() => {

  //   const { data: { user } } = await supabase.auth.getUser();
  //   console.log(user);
  // };
  // h();

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    <div className="row-start-2 row-end-8 grid justify-items-center items-center ">
      <Form handleSubmit={handleSubmit} handleChange={handleChange} inputs={inputs}/>
    </div>
  );
};

export default Create;