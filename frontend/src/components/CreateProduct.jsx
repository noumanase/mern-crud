import React, { useState } from "react";
import { useProductStore } from "../../store/product";

function CreateProduct() {
  const { createProduct } = useProductStore();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
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

    const { success, message } = await createProduct(product);

    if (success) {
      setProduct({
        name: "",
        price: "",
        image: "",
      });
    } else {
      alert(message);
    }
  };

  return (
    <form onSubmit={handleAddProduct} style={styles.containerStyle}>
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
      <div>
        <input
          name="imageXX"
          placeholder="Image"
          type="text"
          id="image"
          value={product.image}
          onChange={handleChange}
          style={styles.inputStyle}
        />
      </div>

      <button type="submit" style={styles.buttonStyle}>
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
