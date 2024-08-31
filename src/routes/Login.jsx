import { Link, useNavigate, } from "react-router-dom";
import supabase from "../utils/client";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({email: "", password: ""});
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    console.log(`${e.target.name}'s new value is: ${e.target.value}`);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  // pretty sure supabase passwords must be 6 chars or more
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: inputs.email,
        password: inputs.password,
      });
      console.log("error");
      console.log(error);
      if (error) {
        setIsError(true);
        setInputs({ ...inputs, password: ""});
        return navigate("/login");
      }
      setIsError(false);
      return navigate("/");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-4 
      justify-self-center self-center p-8 rounded-sm">
        <div className="grid gap-2">
          {isError && <span className=" italic text-red-600">Incorrect username/password</span>}
          <input type="text" placeholder="email" name="email" className="px-2 py-1" 
            value={inputs.email} onChange={handleChange}/>
          <input type="password" placeholder="password" name="password" className="px-2 py-1" 
            value={inputs.password} onChange={handleChange}/>
          <div className="flex gap-10">
            <p className=" text-xs">Don&apos;t have an account yet?</p>
            <Link to="/signup" className="text-xs text-blue-500">Create an account</Link>
          </div>
        </div>
        <button type="submit" className="border-1 border-slate-400 hover:bg-slate-900 
        hover:text-blue-400 transition-all duration-200 rounded-sm">
          Submit
        </button>
      </form>
    </div>
    
  );
}