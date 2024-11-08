import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlayerError() {
  const params = useParams();
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Player not found!", 
      description: "Please spell the player's name correctly.", 
      variant: "destructive"
    });
  }, []);

  return (
    <div className="flex items-center flex-col h-full">
      <h1 className="text-red-500 font-bold">Player with name "{params.playerName}" doesn't exist.</h1>
      <p>Please make sure your spelling is correct.</p>
    </div>
  );
}