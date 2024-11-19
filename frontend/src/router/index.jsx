import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import App from "../App";
import Navbar from "../components/Navbar";
import { isTokenExpired } from "../utils";

function ProtectedRoute({ element }) {
  const tokenExpired = isTokenExpired();

  return tokenExpired ? <Signin /> : element;
}

function AppRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <ProtectedRoute
            element={
              <Navbar>
                <App />
              </Navbar>
            }
          />
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
    ],
    {
      future: {
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default AppRouter;
