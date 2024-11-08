import {  useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function PlayerError() {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Player not found!", 
      description: "Please spell the player's name correctly", 
      variant: "destructive"
    });
  }, []);

  return (
    <div>Player with that name doesn't exist. Please type the name correctly...</div>
  );
}