import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import App from "../App";
import Navbar from "../components/Navbar";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navbar>
          <App />
        </Navbar>
      ),
    },
    {
      path: "/signup",
      element: (
        <Navbar>
          <Signup />
        </Navbar>
      ),
    },
    {
      path: "/signin",
      element: (
        <Navbar>
          <Signin />
        </Navbar>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
