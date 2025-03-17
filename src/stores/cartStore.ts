import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

type CartItem = Product & { quantity: number };

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((item) => item.id !== id) }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
