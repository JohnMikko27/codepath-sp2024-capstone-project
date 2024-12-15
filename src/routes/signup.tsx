import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({username: "", password: "", confirmPassword: ""});
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(env + "/signup", {
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
      if (data.status !== 200) return;
      toast({ title: data.message, className: "bg-green-600 text-white" });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-4 
      justify-self-center self-center p-8 rounded-sm">
        <div className="grid gap-2">
          <input value={inputs.username} type="text" placeholder="username" name="username" 
            className="px-2 py-1 border-1 border-slate-400 border-solid rounded-sm" 
            onChange={handleChange} aria-label="Username input"
          />
          <input value={inputs.password} type="password" placeholder="password" name="password" 
            className="px-2 py-1 border-1 border-slate-400 border-solid rounded-sm" 
            onChange={handleChange} aria-label="Password input"
          />
          <input value={inputs.confirmPassword} type="password" placeholder="confirm password" name="confirmPassword" 
            className="px-2 py-1 border-1 border-slate-400 border-solid rounded-sm" 
            onChange={handleChange} aria-label="Confirm password input"
          />
        </div>
        <div className="flex justify-between gap-4">
          <p className=" text-xs">Have an account already?</p>
          <Link to="/login" className="text-xs text-blue-500" aria-label="Login to your account link">
            Login to your account
          </Link>
        </div>
        <Button type="submit" aria-label="Submit signup credentials button">Submit</Button>
      </form>
    </div>
  );
}