import React from "react";

function Navbar({ children }) {
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.clear();
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
        {token && (
          <span>
            {`Hello ${localStorage.getItem("userName")}. `}
            <button onClick={handleLogout} style={{ fontSize: "12px" }}>
              Logout
            </button>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default Navbar;
