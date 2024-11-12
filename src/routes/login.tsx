import { Link, useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({username: "", password: ""});
  const [isError, setIsError] = useState(false);
  const { setIsSignedIn } = useContext(UserContext);
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  // it doesnt call the api endpoint yet so check post.authorId and localstorage.user.id is the same
  // I SHOULD ALSO NOW ADD EMAILS FOR SIGNING UP AND LOGGIN IN

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(env + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password
        })
      });
      const data = await response.json();
      if (data.status !== 200) {
        setIsError(true);
        return;
      }
      localStorage.setItem("token", `Bearer ${data.token}`);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({ title: data.message, className: "bg-green-600 text-white" });
      setIsSignedIn(true);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row-start-2 row-end-8 grid justify-items-center items-center">
      <form onSubmit={handleSubmit} className="border-slate-400 border-1 grid gap-4 
      justify-self-center self-center p-8 rounded-sm">
        <div className="grid gap-2">
          <input type="text" placeholder="username" name="username" 
            className="px-2 py-1 border-1 border-slate-400 border-solid rounded-sm" 
            value={inputs.username} onChange={handleChange}/>
          <input type="password" placeholder="password" name="password" 
            className="px-2 py-1 border-1 border-slate-400 border-solid rounded-sm" 
            value={inputs.password} onChange={handleChange}/>
          {isError && <span className=" italic text-red-600">Incorrect username/password</span>}
          <div className="flex gap-10">
            <p className=" text-xs">Don&apos;t have an account yet?</p>
            <Link to="/signup" className="text-xs text-blue-500">Create an account</Link>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}