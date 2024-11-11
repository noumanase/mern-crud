import { create } from "zustand";

export const useProductStore = create((set) => ({
  error: null,
  products: [],
  setError: (error) => set({ error }),
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please provide all required fields" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },

  fetchProducts: async () => {
    console.log("inside fetchProducts");
    try {
      console.log("inside try");
      const res = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzBjY2JiNWZiYzNkZjczODg1MjA4MiIsIm5hbWUiOiJub3VtYW4iLCJpYXQiOjE3MzEzNTY3NjQsImV4cCI6MTczMTM2MDM2NH0.Xq5C2rczum_JRmRYHIMv2qcP_WbJaJnVst2enclgXaU`,
        },
      });
      const data = await res.json();
      console.log("got data: ", data);

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
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.data };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
  },
}));
