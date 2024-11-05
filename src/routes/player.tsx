import { YearlyStats, PlayerType } from "@/utils/types";
import { useLoaderData } from "react-router-dom";
import { DateTime as dt } from "ts-luxon";
import StatsDashboard from "./statsdashboard";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

export default function Player() {
  const data = useLoaderData() as { playerInfo: { player_info: PlayerType }, playerStats: { stats: YearlyStats[] }} ;
  const playerInfo = data.playerInfo.player_info;
  const date = dt.fromISO((playerInfo.birthdate).toLocaleString());
  const birthdate = `${date.monthLong} ${date.day}, ${date.year}`;
  
  return (
    <div className="px-10 flex">
      <div className="">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <img 
              className="w-32 h-auto"
              src={playerInfo.player_headshot_url} 
              alt={`${playerInfo}'s headshot`} 
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <CardTitle>{playerInfo.full_name}</CardTitle>
                <CardDescription>Name</CardDescription>
              </div>
              
              <div>
                <CardTitle>{playerInfo.height}</CardTitle>
                <CardDescription>Height</CardDescription>
              </div>
              <div>
                <CardTitle>{playerInfo.weight}</CardTitle>
                <CardDescription>Weight</CardDescription>
              </div>
              <div>
                <CardTitle>{playerInfo.years_in_league}</CardTitle>
                <CardDescription>Experience</CardDescription>
              </div>
              <div>
                <CardTitle>{birthdate}</CardTitle>
                <CardDescription>Birthdate</CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <StatsDashboard playerStats={data.playerStats.stats}/>
      </div>
    </div>
  );
}