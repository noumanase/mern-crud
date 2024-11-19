import React, { useRef, useState } from "react";
import { useProductStore } from "../store/product";
import UploadImage from "./UploadImage";

function CreateProduct() {
  const { createProduct } = useProductStore();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (product.name) formData.append("name", product.name);
    if (product.price) formData.append("price", product.price);
    if (file) formData.append("image", file);

    if (
      !formData.get("name") ||
      !formData.get("price") ||
      !formData.get("image")
    ) {
      alert("Please provide all required fields");
      return;
    }

    const { success, message } = await createProduct(formData);

    if (success) {
      setProduct({
        name: "",
        price: "",
      });
      formData.delete("name");
      formData.delete("price");
      formData.delete("image");
      fileInputRef.current.value = null;
      setFile(null);
      setPreview(null);
    } else {
      alert(message);
    }
  };

  return (
    <form style={styles.containerStyle}>
      <h4>Create new Product</h4>
      <div>
        <input
          placeholder="Name"
          type="text"
          id="name"
          value={product.name}
          onChange={handleChange}
          style={styles.inputStyle}
        />
      </div>
      <div>
        <input
          placeholder="Price"
          type="number"
          id="price"
          value={product.price}
          onChange={handleChange}
          style={styles.inputStyle}
        />
      </div>

      <UploadImage
        imgRef={fileInputRef}
        styles={styles.inputStyle}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
      />

      <button onClick={handleAddProduct} style={styles.buttonStyle}>
        Add Product
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

export default CreateProduct;
