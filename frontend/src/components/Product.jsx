import { useState } from "react";
import { useProductStore } from "../store/product";
import { backendUrl } from "../constants/index";

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
      <img
        src={`${backendUrl}${product?.image}`}
        alt={product?.name}
        width={70}
        style={{ cursor: "pointer" }}
        onClick={() => window.open(`${backendUrl}${product?.image}`, "_blank")}
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          border: "none",
          height: "45px",
          borderRadius: "6px",
          paddingLeft: "8px",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          display: "flex",
          columnGap: "8px",
          alignItems: "center",
        }}
      >
        <span
          style={{ cursor: "pointer" }}
          onClick={() => deleteProduct(product?._id)}
        >
          ❌
        </span>
        <span style={{ cursor: "pointer" }} onClick={handleUpdate}>
          🔄
        </span>
      </div>
    </div>
  );
}

export default Product;
