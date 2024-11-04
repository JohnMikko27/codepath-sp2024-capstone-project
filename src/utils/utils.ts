import { Params } from "react-router-dom";
import supabase from "./client";

const playerLoader = async({ params }: { params: Params<string> }) => {
  try {
    const response = await fetch(`http://localhost:8000/players/${params.playerName}`);
    const data = await response.json();
  
    // should check if theres an error and then send that error
    const response2 = await fetch(`http://localhost:8000/stats/${params.playerName}`);
    const data2 = await response2.json();
    return { playerInfo: data, playerStats: data2 };
  } catch (e) {
    console.log(e);
  }
};

const detailsLoader = async({ params }: { params: Params<string> }) => {
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(env + `/posts/${params.postId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
    });
    const data = await response.json();
    // take care of this error handling
    // if (data.status !== 200) console.log("error");
    return data;
  } catch(e) {
    console.log(e);
  }
};

const uploadImage = async(userId: string, imageId: string, media: string) => {
  try {
    const { error } = await supabase
      .storage
      .from("hooptalk-media")
      .upload(userId + "/" + imageId, media);
    if (error) console.log(error);
  } catch(e) {
    console.log(e);
  }
};

export { detailsLoader, uploadImage, playerLoader };