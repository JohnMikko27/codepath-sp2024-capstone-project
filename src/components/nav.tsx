import { useContext } from "react";
import { Link } from "react-router-dom";
import Profile from "./profile";
import { UserContext } from "../App";
import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { isSignedIn } = useContext(UserContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/players/${input}`);
  };
  
  return (
    <div className="flex gap-8 row-start-1 row-end-2 border-b-1 border-slate-500 border-solid
    justify-between items-center px-8 h-3/4 bg-slate-950 text-blue-300 shadow-sm shadow-slate-600">
      <Link to="/" className="text-2xl hover:underline">HoopTalk</Link>
      <div className="px-30">
        <form onSubmit={handleSubmit} className="flex justify-self-center w-52">
          <Input value={input} onChange={handleChange} className="rounded-full"
            placeholder="Search for a player's stats..."/>
        </form>
      </div>
      <div className="flex gap-12 items-center">
        { isSignedIn && <Link to="/create" className="text-lg hover:underline ">Create</Link> }
        { isSignedIn 
          ? <Profile />
          : <Link to="/login" className="text-lg hover:underline ">Login</Link>
        }
      </div>
    </div>
  );
};

export default Nav;