import Nav from "./components/nav";
import { Outlet } from "react-router-dom";
import React, { createContext, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Login from "./routes/login";

export const UserContext = createContext<{ 
  isSignedIn: boolean; 
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> }>({
    isSignedIn: false,
    setIsSignedIn: () => {}
  });

export const LoadingContext = createContext<{
  isLoading: boolean; 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>}>({
    isLoading: false,
    setIsLoading: () => {}
  });

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(localStorage.getItem("token") ? true : false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoggedIn = localStorage.getItem("user") !== null;
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <UserContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        <div className="grid grid-rows-10 h-screen">
          <div className=" row-span-1">
            <Nav />
          </div>
          <div className=" row-span-9">
            { isLoggedIn ? <Outlet /> : <Login />}
          </div>
          <Toaster />
        </div>
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

