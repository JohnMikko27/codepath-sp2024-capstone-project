import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";
import Create from "./routes/Create.jsx";
import Details from "./routes/Details.jsx";
import Edit from "./routes/Edit.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { homeLoader, detailLoader } from "./utils/utils.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/details/:id",
        element: <Details />,
        loader: detailLoader,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
        loader: detailLoader,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
