import React from "react";
import { Link } from "react-router-dom";

function Navbar({ children }) {
  return (
    <div>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "center",
          columnGap: "12px",
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/signin"}>Signin</Link>
      </div>
      {children}
    </div>
  );
}

export default Navbar;
