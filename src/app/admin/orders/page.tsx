"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/stores/orderStore";

const OrdersPage = () => {
  const { orders, fetchOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Order #{order.id}</h2>
              <p>Status: {order.status}</p>
              <p>Total: ${order.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
