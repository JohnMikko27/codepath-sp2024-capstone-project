import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Root = () => {
    
  return (
    <div className="grid grid-rows-7 h-screen gap-8 bg-slate-100">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Root;