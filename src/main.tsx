import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Stats from "./routes/stats.tsx";
import Login from "./routes/login.tsx";
import Signup from "./routes/signup.tsx";
import Create from "./components/create.tsx";
import Home from "./routes/home.tsx";
import Details from "./routes/details.tsx";
import Edit from "./routes/edit.tsx";
import StatsDashboard from "./routes/statsdashboard.tsx";
import PlayerBio from "./routes/playerBio.tsx";
import { detailsLoader, statsLoader, playerLoader } from "./utils/utils.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      // change the url for these, prob just do /player/:playerName/stats (for the stats page)
      {
        path: "/stats",
        element: <Stats />,
        // loader: statsLoader
        children: [
          {
            path: "/stats/:playerName/",
            element: <PlayerBio />,
            loader: playerLoader
          },
          { 
            path: "/stats/:playerName/careerStats", 
            element: <StatsDashboard />,
            loader: statsLoader
          },
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/create",
        element: <Create />
      },
      {
        path: "/details/:postId",
        element: <Details />,
        loader: detailsLoader
      },
      {
        path: "/edit/:postId",
        element: <Edit />,
        loader: detailsLoader
      }
    ]
  },
  
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
