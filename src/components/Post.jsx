import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Post = ({ title, date, upvotes, id }) => {
  return (
    <div className="border-black border-solid border-2">
      <Link to={`/details/${id}`}>
        <div>{formatDate(date)}</div>
        <div>{title}</div>
        {/* <div>{description}</div> */}
        <div>upvotes: {upvotes}</div>
      </Link>
    </div>
  );
};

export default Post;