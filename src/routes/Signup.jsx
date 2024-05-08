import { Form, Link } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/client";
export default function Signup() {

  const [inputs, setInputs] = useState({email: "", password: ""});

  const handleChange = (e) => {
    console.log(`${e.target.name}'s new value is: ${e.target.value}`);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  // pretty sure supabase passwords must be 6 chars or more
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(inputs.email);
    console.log(inputs.password);
    
    // it wasn't working before because I kept trying to sign in with a user that already existed 
    // and I had no UI showing so
    // so I should add a UI showing if that email has been taken already 

    // when users sign up, since there isn't a confirm email setup (maybe i should add this)
    // it should bring them to the home page and it should put a profile pic in the top right
    // where users are able to see their posts? and upvotes?
    try {
      const { data, error } = await supabase.auth.signUp({
        email: inputs.email,
        password: inputs.password,
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });
      console.log(data);
      
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-2 justify-self-center self-center p-8">
        {/* <input type="text" placeholder="username" name="username" className="px-2 py-1"/> */}
        <input value={inputs.email} type="text" placeholder="email" name="email" className="px-2 py-1" onChange={handleChange}/>
        <input value={inputs.password} type="password" placeholder="password" name="password" className="px-2 py-1" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



