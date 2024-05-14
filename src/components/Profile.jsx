import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import supabase from "../utils/client";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [visible, setVisible]  = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSignout = async() => {
    await supabase.auth.signOut();

    // i probably have to create a new column in each post and user 
    // maybe just each post, 
    // in each post there will be a column called userId that holds the id of the account that created that post
    setVisible(false);
    console.log("signout");
    navigate("/login", {state: {signedIn: false}});
  };

  return (
    <div className=" relative">
      <CircleUserRound className="hover:cursor-pointer" onClick={handleClick}/>
      <div  onClick={handleClick} className={`flex flex-col bg-white text-black border-1 border-black absolute 
        w-24 justify-center right-0 top-8 ${visible ? "flex" : "hidden"}`}
      >
        <button className="border-bottom border-1">Profile</button>
        <button onClick={handleSignout}>Sign out</button>
      </div>
    </div>
  );
}