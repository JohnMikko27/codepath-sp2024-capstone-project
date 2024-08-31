import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Form from "../components/Form";
import supabase from "../utils/client";

const Create = () => {
  const userData = useLoaderData();
  // console.log(userData);
  const [inputs, setInputs] = useState({title: "", description: "", upvotes: 0, comments: [], userId: userData.id, username: userData.user_metadata.username});
  const navigate = useNavigate();

  
  // i think i correctly made the functionality where it shows who created the post
  // but whenever i Refresh, the loggedin user is gone? why

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