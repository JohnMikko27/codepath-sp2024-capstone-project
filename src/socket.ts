import { io } from "socket.io-client";

const URL = import.meta.env.PROD
  ? import.meta.env.VITE_APP_PROD_API_URL 
  : import.meta.env.VITE_APP_DEV_API_URL;

export const socket = io(URL, { 
  autoConnect: false
});