import { Params } from "react-router-dom";

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
    // take care of this error handling
    // if (data.status !== 200) console.log("error");
    return data;
  } catch(e) {
    console.log(e);
  }
};

export { detailsLoader };