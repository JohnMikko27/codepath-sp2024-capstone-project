import { useLoaderData } from "react-router-dom";
import Post from "../components/Post";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="">
      {data && data.map((post) => {
        return (
          <Post key={post.id} title={post.title} description={post.description} 
            date={post.created_at} upvotes={post.upvotes} id={post.id}/>
        );
      })}
    </div>
  );
};

export default Home;
