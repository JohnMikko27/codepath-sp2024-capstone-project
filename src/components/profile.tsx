import { useNavigate, } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger, } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import supabase from "@/utils/client";
import { v4 as v4uuid } from "uuid";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { setIsSignedIn } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user")!);
  const [pfp, setPfp] = useState({ media: "" });
  const { toast } = useToast();
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;
  
  const handleSignout = async() => {
    try {
      setIsSignedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast({ title: "Signout successful.", className: "bg-slate-950 text-white" });
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
      }
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (pfp.media === "") return;
    const imageId = v4uuid();
    // upload pfpUrl to supabase
    const token = localStorage.getItem("token");
    try {
      const { error } = await supabase
        .storage
        .from("hooptalk-media")
        .upload("pfp/" + imageId, pfp.media);
      if (error) console.log(error);
    } catch(e) {
      console.log(e);
    }

    const imageUrl = `https://ekcnbalczcqlpckprbce.supabase.co/storage/v1/object/public/hooptalk-media/pfp/${imageId}`; 
    // update pfpUrl field in backend
    const response = await fetch(`${env}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
      body: JSON.stringify({ 
        media: pfp.media !== "" 
          ? imageUrl
          : ""
      })
    });
    const data = await response.json();
    const newUser = {...user, pfpUrl: data.user.pfpUrl };
    localStorage.setItem("user", JSON.stringify(newUser));
    setPfp({...pfp, media: "" });
  };

  return (
    <div className="flex items-center">
      <Sheet>
        <SheetTrigger>
          <Avatar>
            <AvatarImage src={user.pfpUrl} alt="User's profile pic" 
              className=" object-cover object-center"
            />
            <AvatarFallback>
              <img src="https://ekcnbalczcqlpckprbce.supabase.co/storage/v1/object/public/hooptalk-media/default-pfp.png"/>
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent className="flex flex-col ">
          <div>
            <SheetTitle>Profile</SheetTitle>
            <SheetDescription>View your information and update pfp</SheetDescription>
          </div>
          <Avatar>
            <AvatarImage src={user.pfpUrl} alt="User's profile pic"
              className=" object-cover object-center"
            />
            <AvatarFallback>
              <img src="https://ekcnbalczcqlpckprbce.supabase.co/storage/v1/object/public/hooptalk-media/default-pfp.png" alt="Default profile pic" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-16">
            <form onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <Input type="file" name="media" id="media" accept=".png, .jpg, .jpeg" onChange={handleChange} />
              <Button 
                type="submit" 
                variant="secondary"
              >
                  Upload Image
              </Button>
            </form>
          </div>
          <div className=" flex flex-col justify-end  justify-self-end flex-1">
            <Button onClick={handleSignout}>Sign out</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}