import { create } from "zustand";
import {
  createProductApi,
  fetchProductsApi,
  deleteProductApi,
  updateProductApi,
} from "../api";

export const useProductStore = create((set) => ({
  error: null,
  products: [],
  setError: (error) => set({ error }),
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please provide all required fields" };
    }

    const { data } = await createProductApi(newProduct);

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },

  fetchProducts: async () => {
    try {
      const { data } = await fetchProductsApi();

      if (!data.success) {
        set({ error: data.message });

        return { success: false, message: data.message };
      }
      set({ products: data.data });
    } catch (error) {
      console.log("error; , ", error);
    }
  },

  deleteProduct: async (pid) => {
    const { data } = await deleteProductApi(pid);

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    const { data } = await updateProductApi(pid, updatedProduct);

    if (!data.success) return { success: false, message: data.data };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
  },
}));
