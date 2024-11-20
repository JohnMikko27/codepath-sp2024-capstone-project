import { useContext } from "react";
import { UserContext } from "@/App";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSignedIn } = useContext(UserContext);
     
  return (
    <>
      {isSignedIn 
        ? <Outlet />
        : <Navigate to={"/login"} />
      }
    </>
  );
}