import Nav from "./components/ui/nav";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="grid grid-rows-10 h-screen">
      <div className=" row-span-1">
        <Nav />
      </div>
      <div className=" row-span-9">
        <Outlet />
      </div>
    </div>
  );
}

