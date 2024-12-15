import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DetailsError() {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "This post might have recently been deleted...", 
      className: "bg-slate-950 text-white"
    });
  }, []);

  return (
    <div className="flex items-center flex-col h-full">
      <h1 className="text-red-500 font-bold">This post doesn't exist.</h1>
      <Link to="/" className="underline ">Go back to home page</Link>
    </div>
  );
}