import Nav from "./components/nav";
import { Outlet } from "react-router-dom";
import React, { createContext, useState } from "react";

export const UserContext = createContext<{ isSignedIn: boolean; setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> }>({
  isSignedIn: false,
  setIsSignedIn: () => {}
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(localStorage.getItem("token") ? true : false);
  return (
    <UserContext.Provider value={{isSignedIn, setIsSignedIn}}>
      <div className="grid grid-rows-10 h-screen">
        <div className=" row-span-1">
          <Nav />
        </div>
        <div className=" row-span-9">
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
}

