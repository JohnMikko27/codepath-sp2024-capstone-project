/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { YearlyStats, PlayerType } from "@/utils/types";
import { useLoaderData } from "react-router-dom";
import PlayerBio from "./playerBio";
import StatsDashboard from "./statsdashboard";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

export default function Player() {
  const data = useLoaderData() as { playerInfo: { player_info: PlayerType }, playerStats: { stats: YearlyStats[] }} ;
  const [filter, setFilter] = useState("bio");
  const playerInfo = data.playerInfo.player_info;
  return (
    <div className="px-10">
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <img 
              className="w-32 h-auto"
              src={playerInfo.player_headshot_url} 
              alt={`${playerInfo}'s headshot`} 
            />
            <CardTitle>{playerInfo.full_name}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="flex gap-8">
        <Button onClick={() => setFilter("bio")} >Bio</Button>
        <Button onClick={() => setFilter("stats")} >Stats</Button>
      </div>
      <div>
        {
          filter === "bio"
            ? <PlayerBio playerInfo={data.playerInfo.player_info}/>
            : <StatsDashboard playerStats={data.playerStats.stats}/>
        }
      </div>
      
    </div>
  );
}