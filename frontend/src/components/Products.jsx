import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import Product from "./Product";

function Products() {
  const { error, products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) return <div>{error}</div>;

  return (
    <div style={{ userSelect: "none", width: "350px", marginBottom: "24px" }}>
      {products.length > 0 &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
    </div>
  );
}

export default Products;
