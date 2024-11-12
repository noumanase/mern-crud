import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!user.name || !user.password) {
      alert("Please provide all required fields");
      return;
    }

    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (data.success) {
        setUser({ name: "", password: "" });
        localStorage.setItem("authToken", data?.data?.token);
        navigate("/");
      } else {
        alert(data.message || "Sign-in failed");
      }
    } catch (error) {
      alert("An error occurred during sign-in. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSignin} style={styles.containerStyle}>
      <div>
        <input
          required
          placeholder="Name"
          type="text"
          id="name"
          value={user.name}
          onChange={handleChange}
          style={styles.inputStyle}
        />
      </div>
      <div>
        <input
          required
          placeholder="Password"
          type="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          style={styles.inputStyle}
        />
      </div>

      <button type="submit" style={styles.buttonStyle}>
        SignIn
      </button>
    </form>
  );
}

const styles = {
  containerStyle: { userSelect: "none", width: "350px" },
  inputStyle: {
    height: "40px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "4px",
  },
  buttonStyle: {
    width: "100%",
    backgroundColor: "teal",
    borderRadius: "0",
    boxSizing: "border-box",
  },
};

export default Signin;
