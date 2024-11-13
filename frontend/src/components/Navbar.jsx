import React from "react";
import { Link } from "react-router-dom";

function Navbar({ children }) {
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "12px",
        }}
      >
        {/* <Link to={"/"}>Home</Link> */}
        {token ? (
          <span>
            Hello, username.{" "}
            <button onClick={handleLogout} style={{ fontSize: "12px" }}>
              Logout
            </button>
          </span>
        ) : null
        // <Link to={"/signin"}>Signin</Link>
        // <Link to={"/signup"}>Signup</Link>
        }
      </div>
      {children}
    </div>
  );
}

export default Navbar;
