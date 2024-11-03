import { Params } from "react-router-dom";
import supabase from "./client";

const playerLoader = async({ params }: { params: Params<string> }) => {
  const response = await fetch(`http://localhost:8000/players/${params.playerName}`);
  const data = await response.json();
  return data;
};

const statsLoader = async() => {
  const response = await fetch("http://localhost:8000/stats/stephen curry");
  const data = await response.json();
  return data;
};

const detailsLoader = async({ params }: { params: Params<string> }) => {
  console.log(params);
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

export { detailsLoader, uploadImage, statsLoader, playerLoader };