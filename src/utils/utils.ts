import { Params } from "react-router-dom";
import supabase from "@/utils/client";

const detailsLoader = async({ params }: { params: Params<string> }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/posts/${params.postId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
    });
    const data = await response.json();
    const user = JSON.parse(localStorage.getItem("user")!);
    const { data: imgUrl } = supabase
      .storage
      .from("hooptalk-media")
      .getPublicUrl(user.id + "/" + data.id);
    // take care of this error handling
    // if (data.status !== 200) console.log("error");
    return { data, imgUrl };
  } catch(e) {
    console.log(e);
  }
};

export { detailsLoader };