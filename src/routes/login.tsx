import { Link, useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({username: "", password: ""});
  const [isError, setIsError] = useState(false);
  const { setIsSignedIn } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${e.target.name}'s new value is: ${e.target.value}`);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  // I CAN EDIT EVEN THOUGH I'M NOT THE USER, MAKE SURE I FIX THIS WITH THE BACKEND
  // actually this is with the frontend because clicking on the edit button goes to a new page but
  // it doesnt call the api endpoint yet so check post.authorId and localstorage.user.id is the same
  // I SHOULD ALSO NOW ADD EMAILS FOR SIGNING UP AND LOGGIN IN

  // then add the loading spinners and add user feedback everytime a user logs in or signs up
  // or when they create a post or comment, edit, delete, etc. 

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
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
      if (data.status === 401) {
        setIsError(true);
        return;
      }

      localStorage.setItem("token", `Bearer ${data.token}`);
      localStorage.setItem("user", JSON.stringify(data.user));
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
          <input type="text" placeholder="username" name="username" className="px-2 py-1" 
            value={inputs.username} onChange={handleChange}/>
          <input type="password" placeholder="password" name="password" className="px-2 py-1" 
            value={inputs.password} onChange={handleChange}/>
          {isError && <span className=" italic text-red-600">Incorrect username/password</span>}
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