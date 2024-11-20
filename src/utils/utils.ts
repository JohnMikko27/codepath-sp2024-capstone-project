import { Params } from "react-router-dom";
import supabase from "./client";

const playerLoader = async({ params }: { params: Params<string> }) => {
  const statsApiUrl = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_STATS_API_URL 
    : import.meta.env.VITE_APP_DEV_STATS_API_URL;
    
  try {
    const playerResponse = await fetch(`${statsApiUrl}/players/${params.playerName}`);
    const playerInfo = await playerResponse.json();
  
    // should check if theres an error and then send that error
    const regSeasonResponse = await fetch(`${statsApiUrl}/stats/${params.playerName}/regseason`);
    const regSeasonStats = await regSeasonResponse.json();

    const postSeasonResponse = await fetch(`${statsApiUrl}/stats/${params.playerName}/postseason`);
    const postSeasonStats = await postSeasonResponse.json();
    if (playerInfo.status === false || regSeasonStats.status === false || postSeasonStats.status === false) {
      return { status: false, message: "Player not found", playerInfo: {}, regSeasonStats: {}, postSeasonStats: {} };
    }

    return { playerInfo, regSeasonStats, postSeasonStats };
  } catch (e) {
    console.log(e);
  }
};

const detailsLoader = async({ params }: { params: Params<string> }) => {
  const env = import.meta.env.PROD 
    ? import.meta.env.VITE_APP_PROD_API_URL 
    : import.meta.env.VITE_APP_DEV_API_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(env + `/posts/${params.postId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
    });
    const data = await response.json();
    // take care of this error handling
    // if (data.status !== 200) console.log("error");
    return data;
  } catch(e) {
    console.log(e);
  }
};

const uploadImage = async(userId: string, imageId: string, media: string) => {
  try {
    const { error } = await supabase
      .storage
      .from("hooptalk-media")
      .upload(userId + "/" + imageId, media);
    if (error) console.log(error);
  } catch(e) {
    console.log(e);
  }
};

const truncate = (num: number, decimalPlaces: number) => {
  const multiplier = Math.pow(10, decimalPlaces);
  return ((num * multiplier) / multiplier).toFixed(1);
};


export { detailsLoader, uploadImage, playerLoader, truncate };