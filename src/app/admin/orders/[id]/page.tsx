"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useOrderStore } from "@/stores/orderStore";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { orders, fetchOrders } = useOrderStore();
  interface Order {
    id: string;
    status: string;
    totalPrice: number;
    items: { id: string; name: string; quantity: number }[];
  }
  
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orders.length) {
      fetchOrders();
    }
    const foundOrder = orders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id, orders]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Total: ${order.totalPrice}</p>
      <ul className="mt-4">
        {order.items.map((item) => (
          <li key={item.id}>{item.name} - {item.quantity}x</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailPage;
