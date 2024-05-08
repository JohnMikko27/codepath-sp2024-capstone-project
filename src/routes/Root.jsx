import Nav from "../components/Nav";
import { Outlet, useLoaderData } from "react-router-dom";

const Root = () => {
  const data = useLoaderData();
    
  return (
    <div className="grid grid-rows-7 h-screen gap-8 bg-slate-100">
      <Nav signedIn={data}/>
      <Outlet />
    </div>
  );
};

export default Root;