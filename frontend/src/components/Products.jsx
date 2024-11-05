import React, { useEffect } from "react";
import { useProductStore } from "../../store/product";

function Products() {
  const { products, deleteProduct, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div style={{ userSelect: "none", width: "350px", marginBottom: "24px" }}>
      {products.length > 0 &&
        products.map((product) => (
          <div
            key={product._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{product?.name}</p>
            <button
              style={{ height: "50px" }}
              onClick={() => deleteProduct(product?._id)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default Products;
