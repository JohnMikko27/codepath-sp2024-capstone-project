import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Root = () => {
    
  return (
    <div className="grid grid-rows-7 h-screen">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Root;