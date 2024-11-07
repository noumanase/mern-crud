import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";

import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";

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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
