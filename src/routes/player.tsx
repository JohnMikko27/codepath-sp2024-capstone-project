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
  const data = useLoaderData() as 
  { 
    playerInfo: { player_info: PlayerType }, 
    regSeasonStats: { reg_season_stats: YearlyStats[] }, 
    postSeasonStats: { post_season_stats: YearlyStats[] }
  };

  const playerInfo = data.playerInfo.player_info;
  const date = dt.fromISO((playerInfo.birthdate).toLocaleString());
  const birthdate = `${date.monthLong} ${date.day}, ${date.year}`;
  console.log(data);
  
  return (
    <div className="px-10 flex pb-10">
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
      <div className="flex flex-col gap-8">
        <StatsDashboard playerStats={data.regSeasonStats.reg_season_stats} postSeason={false} />
        <StatsDashboard playerStats={data.postSeasonStats.post_season_stats} postSeason={true} />
      </div>
    </div>
  );
}