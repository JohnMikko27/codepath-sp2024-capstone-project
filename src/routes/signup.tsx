/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({username: "", password: "", confirmPassword: ""});

  const handleChange = (e: any) => {
    console.log(`${e.target.name}'s new value is: ${e.target.value}`);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: inputs.username, 
          password: inputs.password, 
          confirmPassword: inputs.confirmPassword
        })
      });
      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-4 
      justify-self-center self-center p-8 w-1/4 rounded-sm">
        <div className="grid gap-2">
          <input value={inputs.username} type="text" placeholder="username" name="username" 
            className="px-2 py-1" onChange={handleChange}/>
          <input value={inputs.password} type="password" placeholder="password" name="password" 
            className="px-2 py-1" onChange={handleChange}/>
          <input value={inputs.confirmPassword} type="password" placeholder="confirm password" name="confirmPassword" 
            className="px-2 py-1" onChange={handleChange}/>
        </div>
        <button type="submit" className="border-1 border-slate-400 hover:bg-slate-900 
        hover:text-blue-400 transition-all duration-200 rounded-sm">
          Submit
        </button>
      </form>
    </div>
  );
}


