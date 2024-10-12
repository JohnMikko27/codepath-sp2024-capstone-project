import { useLoaderData } from "react-router-dom";
import { PostType } from "@/utils/types";

// create post type
export default function Edit() {
  const postData = useLoaderData() as PostType;
  console.log(postData);

  return (
    <div>post with id {postData.id}</div>
  );
}