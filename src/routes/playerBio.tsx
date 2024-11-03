/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";

export default function PlayerBio() {
  const data = useLoaderData() as any;
  console.log(data);
  return (
    <div>playerbio</div>
  );
}