import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Post = ({ title, date, upvotes, id, username}) => {
  // it doesn't fully allow you to click the entire post, clicking near the outer part won't actually click
  return (
    <div className="post border-gray-400 border-solid border-1 bg-white 
    px-8 py-4 rounded-sm ">
      <Link className="post-link" to={`/details/${id}`}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">Posted by: {username}</div>
          <div className=" text-xs text-gray-400">{formatDate(date)}</div>
        </div>
        <div className="text-xl">{title}</div>
        {/* <div>{description}</div> */}
        <div>upvotes: {upvotes}</div>
      </Link>
    </div>
  );
};

export default Post;