const Post = ({ title, description, date, upvotes }) => {
  return (
    <div>
      <div>{date}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>upvotes: {upvotes}</div>
    </div>
  );
};

export default Post;