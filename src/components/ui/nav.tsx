import { Link, } from "react-router-dom";
// import { useState, } from "react";

// when users logout, i should remove token from local storage
const Nav = () => {
//   const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  
  return (
    <div className="flex gap-8 row-start-1 row-end-2 border-b-1 border-slate-500 border-solid
    justify-between items-center px-8 bg-slate-950 text-blue-300 shadow-sm shadow-slate-600">
      <Link to="/" className="text-2xl hover:underline">HoopTalk</Link>
      <div className="flex gap-12">
        {/* {isSignedIn && <Link to="/create" className="text-lg hover:underline ">Create</Link>} */}
        {/* {isSignedIn && */}
        <Link to="/login" className="text-lg hover:underline ">Login</Link>
        {/* } */}
      </div>
    </div>
  );
};

export default Nav;