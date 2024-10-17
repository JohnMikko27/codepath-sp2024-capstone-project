import { CircleUserRound } from "lucide-react";
import { useNavigate, } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function Profile() {
  const navigate = useNavigate();
  const [visible, setVisible]  = useState(false);
  const { setIsSignedIn } = useContext(UserContext);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSignout = async() => {
    setVisible(false);
    try {
      const response = await fetch("http://localhost:3000/logout");
      const data = await response.json();
      // add some user feedback here using data.message or something
      console.log(data);
      setIsSignedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
    navigate("/login");
  };

  return (
    <div className=" relative">
      <CircleUserRound className="hover:cursor-pointer" onClick={handleClick}/>
      <div className={`flex flex-col bg-white text-black border-1 border-black absolute 
        w-24 justify-center right-0 top-8 ${visible ? "flex" : "hidden"}`}
      >
        <button className="border-bottom border-1">Profile</button>
        <button onClick={handleSignout}>Sign out</button>
      </div>
    </div>
  );
}