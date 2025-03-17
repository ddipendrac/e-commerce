import { create } from "zustand";
import { Product } from "@/types";
import { getProducts } from "@/utils/api";

interface ProductState {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: true,
  fetchProducts: async () => {
    try {
      const data = await getProducts();
      set({ products: data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false });
    }
  },
}));
