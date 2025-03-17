"use client";

import { useCartStore } from "@/stores/cartStore";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartPage;
