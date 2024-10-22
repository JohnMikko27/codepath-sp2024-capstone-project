import { CircleUserRound } from "lucide-react";
import { useNavigate, } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";

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
      setIsSignedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" relative">
      <CircleUserRound className="hover:cursor-pointer" onClick={handleClick}/>
      <div className={`flex flex-col bg-white text-black absolute 
        w-24 justify-center right-0 top-8 ${visible ? "flex" : "hidden"}`}
      >
        <Button className="border-bottom border-1">Profile</Button>
        <Button onClick={handleSignout}>Sign out</Button>
      </div>
    </div>
  );
}