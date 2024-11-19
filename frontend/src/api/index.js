import api from "../axios";

export const createProductApi = async (newProduct) => {
  return await api.post("/products", newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchProductsApi = async () => {
  return await api.get("/products");
};

export const deleteProductApi = async (pid) => {
  return await api.delete(`/products/${pid}`);
};

export const updateProductApi = async (pid, updatedProduct) => {
  return await api.put(`/products/${pid}`, updatedProduct);
};
