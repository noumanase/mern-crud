import { useState } from "react";
import { useProductStore } from "../store/product";

function Product({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const [name, setName] = useState(product?.name);

  const handleUpdate = () => {
    if (name !== product?.name)
      updateProduct(product?._id, { ...product, name });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          border: "none",
          height: "45px",
          borderRadius: "6px",
        }}
      />
      <div>
        <button
          style={{ height: "50px" }}
          onClick={() => deleteProduct(product?._id)}
        >
          delete
        </button>
        <button style={{ height: "50px" }} onClick={handleUpdate}>
          update
        </button>
      </div>
    </div>
  );
}

export default Product;
