import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Post = ({ title, date, upvotes, id, username}) => {
  // it doesn't fully allow you to click the entire post, clicking near the outer part won't actually click
  return (
    <div className="border-gray-400 border-solid border-1 bg-white 
    px-8 py-4 rounded-sm hover:bg-slate-200  transition-all duration-200">
      <div>author: {username}</div>
      <Link className="" to={`/details/${id}`}>
        <div className=" text-xs text-gray-400">{formatDate(date)}</div>
        <div className="text-xl">{title}</div>
        {/* <div>{description}</div> */}
        <div>upvotes: {upvotes}</div>
      </Link>
    </div>
  );
};

export default Post;