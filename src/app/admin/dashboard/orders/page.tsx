"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [status, setStatus] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/orders`, {
        params: { page, sort, status },
      });
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, sort, status]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {/* Sorting & Filtering */}
      <div className="flex gap-4 mb-4">
        {/* Sort */}
        <Select value={sort} onValueChange={setSort}>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="high">Highest Price</SelectItem>
          <SelectItem value="low">Lowest Price</SelectItem>
        </Select>

        {/* Filter by Status */}
        <Select value={status} onValueChange={setStatus}>
          <SelectItem value="">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </Select>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Link href={`/orders/${order._id}`} className="text-blue-500">
                <p className="font-semibold">Order ID: {order._id}</p>
              </Link>
              <p>Total: NPR {order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default OrdersPage;
