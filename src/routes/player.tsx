 
 
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { YearlyStats, PlayerType } from "@/utils/types";
import { useLoaderData } from "react-router-dom";
import PlayerBio from "./playerBio";
import StatsDashboard from "./statsdashboard";

// for my api i need to check the names that are similar because right now its just an exact check
// eg i should be able to get curry after searching up "stephen c"

export default function Player() {
  const data = useLoaderData() as { playerInfo: PlayerType, playerStats: { stats: YearlyStats[] }} ;
  const [filter, setFilter] = useState("bio");

  return (
    <div className="px-10">
      <div className="flex gap-8">
        <Button onClick={() => setFilter("bio")} >Bio</Button>
        <Button onClick={() => setFilter("stats")} >Stats</Button>
      </div>
      <div>
        {
          filter === "bio"
            ? <PlayerBio playerInfo={data.playerInfo}/>
            : <StatsDashboard playerStats={data.playerStats.stats}/>
        }
      </div>
      
    </div>
  );
}