import { useLoaderData } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Details = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div>{data[0].title}</div>
      <div>{data[0].description}</div>
      <div>{formatDate(data[0].created_at)}</div>
      <div>{data[0].upvotes}</div>
    </div>
  );
};

export default Details;