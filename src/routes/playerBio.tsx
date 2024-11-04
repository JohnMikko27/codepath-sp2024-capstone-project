/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlayerType } from "@/utils/types";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

export default function PlayerBio({ playerInfo }: { playerInfo: PlayerType}) {
  console.log("playerInfo");
  console.log(playerInfo);
  return (
    <div>
        hi playbio
      <Card>
        <CardHeader>
          {/* <CardTitle>{playerInfo.full_name}</CardTitle> */}
        </CardHeader>
      </Card>
    </div>
  );
}