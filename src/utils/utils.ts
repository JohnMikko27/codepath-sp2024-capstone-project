import { Params } from "react-router-dom";
import supabase from "./client";

const detailsLoader = async({ params }: { params: Params<string> }) => {
  const env = import.meta.env.PROD 
    ? "https://hooptalk-api-production.up.railway.app" 
    : "http://localhost:3000";

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

export { detailsLoader, uploadImage };