import { Link, useNavigate, } from "react-router-dom";
import supabase from "../utils/client";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({email: "", password: ""});

  const handleChange = (e) => {
    console.log(`${e.target.name}'s new value is: ${e.target.value}`);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  // pretty sure supabase passwords must be 6 chars or more
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      await supabase.auth.signInWithPassword({
        email: inputs.email,
        password: inputs.password,
      });
      navigate("/");
      
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-2 justify-self-center self-center p-8">
        <input type="text" placeholder="email" name="email" className="px-2 py-1" value={inputs.email} onChange={handleChange}/>
        <input type="password" placeholder="password" name="password" className="px-2 py-1" value={inputs.password} onChange={handleChange}/>
        <div className="flex gap-10">
          <p className=" text-xs">Don&apos;t have an account yet?</p>
          <Link to="/signup" className="text-xs text-blue-500">Create an account</Link>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
}