import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import App from "../App";

function Router({ children }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
  ]);

  return <RouterProvider router={router}>{children}</RouterProvider>;
}

export default Router;
