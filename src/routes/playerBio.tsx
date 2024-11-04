import { PlayerType } from "@/utils/types";
import { DateTime as dt } from "ts-luxon";

export default function PlayerBio({ playerInfo }: { playerInfo: PlayerType }) {
  const date = dt.fromISO((playerInfo.birthdate).toLocaleString());
  const birthdate = `${date.monthLong} ${date.day}, ${date.year}`;
  
  return (
    <div>
      <div>{playerInfo.full_name}</div>
      <div>{birthdate}</div>
      <div>{playerInfo.height}</div>
      <div>{playerInfo.weight}</div>
      <div>{playerInfo.years_in_league}</div>
    </div>
  );
}