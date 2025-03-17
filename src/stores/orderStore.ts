import { create } from "zustand";
import { Order } from "@/types";
import { getOrders } from "@/utils/api";

interface OrderState {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  loading: true,
  fetchOrders: async () => {
    try {
      const data = await getOrders();
      set({ orders: data, loading: false });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ loading: false });
    }
  },
}));
