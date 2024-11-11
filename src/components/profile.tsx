 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircleUserRound } from "lucide-react";
import { useNavigate, } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger,  } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import supabase from "@/utils/client";
import { v4 as v4uuid } from "uuid";


export default function Profile() {
  const navigate = useNavigate();
  const [visible, setVisible]  = useState(false);
  const { setIsSignedIn } = useContext(UserContext);
  const [pfp, setPfp] = useState({ media: ""});
  const user = JSON.parse(localStorage.getItem("user")!);
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;
  const imageUrl = useRef("");

  // work on the profile thing where i click the profile, can change the pfp, and see
  // user info like, date account created, # of posts/comments, etc. 
  // gotta add more stuff (fields in user model) in the hooptalk api next

  // when user clicks update pfp, 
  // then chooses a file (should check if it's png/jpg/jpeg, etc. not pdf or movies)
  // the avatar image should be updated appropriately
  // the image url should be supabaseurl/pfp/userId (so that when i'm at home page, i just fetch that from supabase to have the right pfp)
  // then the pfpUrl in backend has to be updated as well, 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setPfp({...pfp, [e.target.name]: file});
        console.log("changed");
      }
    }
  };

  useEffect(() => {
    let flag = true;
    const uploadPfp = async() => {
      const imageId = v4uuid();
      const token = localStorage.getItem("token");
      try {
        const { error } = await supabase
          .storage
          .from("hooptalk-media")
          .upload("pfp/" + imageId, pfp.media, {
            upsert: true,
          });
        if (error) console.log(error);
      } catch(e) {
        console.log(e);
      }
      imageUrl.current = `https://ekcnbalczcqlpckprbce.supabase.co/storage/v1/object/public/hooptalk-media/pfp/${imageId}`; 
      const response = await fetch(`${env}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `${token}`,
        },
        body: JSON.stringify({ 
          media: pfp.media !== "" 
            ? imageUrl.current
            : ""
        })
      });
      const data = await response.json();
      const newUser = {...user, pfp: imageUrl.current };
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log("data");
      console.log(data);
    };
    if (pfp.media !== "" && flag) uploadPfp();
    return (() => {
      flag = false;
    });
  }, [pfp.media]);

  return (
    <div className=" relative">
      <div>
        <Sheet>
          <SheetTrigger>
            <Avatar>
              <AvatarImage src={imageUrl.current} alt="User's profile pic" 
                className=" object-cover object-center"
              />
              <AvatarFallback>
                <img src="src/assets/default-pfp.png"/>
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Profile</SheetTitle>
            <SheetDescription>View your information and update pfp</SheetDescription>
            <Avatar>
              <AvatarImage src={imageUrl.current} alt="User's profile pic" 
                className=" object-cover object-center"
              />
              <AvatarFallback>
                <img src="src/assets/default-pfp.png" alt="Default profile pic" />
                {/* <CircleUserRound /> */}
              </AvatarFallback>
            </Avatar>
            <div>
              <Input type="file" name="media" id="media" accept="*" onChange={handleChange}/>

            </div>
            <div>
              <Button onClick={handleSignout}>Sign out</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>




      {/* <CircleUserRound className="hover:cursor-pointer" onClick={handleClick}/>
      <div className={`flex flex-col absolute 
        w-24 justify-center right-0 top-8 ${visible ? "flex" : "hidden"}`}
      >
        
        <Button onClick={handleSignout}>Sign out</Button>
      </div> */}
    </div>
  );
}