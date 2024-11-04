import { useContext } from "react";
import { Link } from "react-router-dom";
import Profile from "./profile";
import { UserContext } from "../App";
// import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger,  } from "./ui/sheet";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
// import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { isSignedIn } = useContext(UserContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // add some logic here to check if player exists
    navigate(`/players/${input}`);
  };
  
  return (
    <div className="flex gap-8 row-start-1 row-end-2 border-b-1 border-slate-500 border-solid
    justify-between items-center px-8 h-3/4 bg-slate-950 text-blue-300 shadow-sm shadow-slate-600">
      <Link to="/" className="text-2xl hover:underline">HoopTalk</Link>
      <div>
        <form onSubmit={handleSubmit} className="flex justify-self-center w-1/3">
          <Input value={input} onChange={handleChange}
            placeholder="Search for a player's stats..."/>
        </form>
      </div>
      <div className="flex gap-12">
        {isSignedIn && <Link to="/create" className="text-lg hover:underline ">Create</Link>}
        {/* <div>
          <Sheet>
            <SheetTrigger>
            
              <Avatar>
                <AvatarImage src="src/assets/default-pfp.png" alt="User's profile pic"></AvatarImage>
                <AvatarFallback>
                  <img src="src/assets/default-pfp.png"/>
                </AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Profile</SheetTitle>
              <SheetDescription>View your information and update pfp</SheetDescription>
              <Avatar>
                <AvatarImage src="src/assets/default-pfp.png" alt="User's profile pic"></AvatarImage>
                
              </Avatar>
              <div>
                <Input type="file" id="pfp" name="pfp"/>
              </div>
            </SheetContent>
          </Sheet>
        </div> */}
        { isSignedIn 
          ? <Profile/>
          : <Link to="/login" className="text-lg hover:underline ">Login</Link>
        }
      </div>
    </div>
  );
};

export default Nav;