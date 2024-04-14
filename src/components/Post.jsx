import { formatDate } from "../utils/utils";

const Post = ({ title, description, date, upvotes }) => {
  return (
    <div>
      <div>{formatDate(date)}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>upvotes: {upvotes}</div>
    </div>
  );
};

export default Post;