import { useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/client";

export default function Signup() {
  const [inputs, setInputs] = useState({username: "", email: "", password: ""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(`${e.target.name}'s new value is: ${e.target.value}`);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  // pretty sure supabase passwords must be 6 chars or more
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: inputs.email,
        password: inputs.password,
        options : {
          data: {
            username: inputs.username
          }
        }
      });
      console.log(data);
      navigate("/");
      
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-2 justify-self-center self-center p-8">
        {/* <input type="text" placeholder="username" name="username" className="px-2 py-1"/> */}
        <input value={inputs.username} type="text" placeholder="username" name="username" className="px-2 py-1" onChange={handleChange}/>
        <input value={inputs.email} type="email" placeholder="email" name="email" className="px-2 py-1" onChange={handleChange}/>
        <input value={inputs.password} type="password" placeholder="password" name="password" className="px-2 py-1" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



