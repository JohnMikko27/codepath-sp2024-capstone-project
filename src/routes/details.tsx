/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";

export default function Details() {
  const postData:any = useLoaderData();
  console.log(postData);
  
  return (
    <div className="flex flex-col row-start-2 row-end-8 gap-4 
    px-8 py-4 rounded-sm ">
      <div className="bg-slate-100 border-1 border-slate-100 border-solid flex flex-col px-4 py-2 gap-4">
        <div className="flex justify-between">
          <div className="text-md text-gray-400">Posted by: {postData.author.username}</div>
          {/* <div className="text-md text-gray-400">{formatDate(data[0].created_at)}</div> */}
        </div>
        <div className="text-2xl font-semibold">{postData.title}</div>
        <div className="text-xl">{postData.content}</div>
        {/* <div className="flex items-center justify-end gap-4">
          <div className="flex justify-center items-center gap-1">
            <div>{upvotes}</div>
            <ThumbsUp onClick={handleUpvote} className="hover:cursor-pointer"/>
          </div>
          <div className="flex gap-4">
            {data[0].isUser && <Link to={`/edit/${data[0].id}`}>
              <Pencil />
            </Link>}
            {data[0].isUser && <Trash2 onClick={deleteData} className=" hover:cursor-pointer"/>}
          </div>
        </div> */}
      </div>
      {/* <div>
        <form onSubmit={handleComment} className="grid gap-2">
          <input type="text" value={comment} onChange={handleChange} placeholder="Add a comment" 
            className=" h-12 border-1 border-slate-400 border-solid px-4 py-2 rounded-3xl"/>
          <button type="submit" 
            className=" px-4 py-2 border-1 border-slate-400 border-solid hover:underline
          rounded-md bg-slate-950 text-blue-300 transition-all duration-200">
            Comment
          </button>
        </form>
      </div> */}
      {/* <div className="grid gap-2 ">
        {commentsArr.map((comm, i) => {
          return (
            <div 
              className="bg-white border-1 border-gray-400 border-solid px-2 py-1 rounded-md"
              key={i}>{comm}
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
