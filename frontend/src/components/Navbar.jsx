import React, { useState } from "react";
import api from "../axios";

function Navbar({ children }) {
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("upload data: ", data);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {preview && <img src={preview} alt="Preview" width={100} />}
      <button type="submit" onClick={handleSubmit}>
        Upload
      </button>

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
