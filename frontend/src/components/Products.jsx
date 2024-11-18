import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import Product from "./Product";

function Products() {
  const { loading, error, products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div style={styles.loadingContainer}>Loading...</div>;

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

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
};

export default Products;
