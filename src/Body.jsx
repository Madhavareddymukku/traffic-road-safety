// import React from "react";
import Login from "./Login";
import RealTimeData from "./RealTimeData";
import Traffic from "./Traffic";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
      },
    {
      path: "/traffic",
      element: <Traffic />,
    },
    {
      path: '/realtimedata',
      element:<RealTimeData />
    }
  ]);

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
};

export default Body;
