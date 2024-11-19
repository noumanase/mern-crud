import React from "react";

const UploadImage = ({ styles, imgRef, setFile, preview, setPreview }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  return (
    <div style={{ display: "flex", alignItems: "self-end" }}>
      <input
        ref={imgRef}
        name="image"
        type="file"
        id="image"
        onChange={handleFileChange}
        style={styles}
      />
      {preview && <img src={preview} alt="Preview" width={100} />}
    </div>
  );
};

export default UploadImage;
