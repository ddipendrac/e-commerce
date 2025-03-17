// 📌 User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional, should not be sent to the frontend
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

// 📌 Product Interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 📌 Category Interface
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// 📌 Cart Item Interface
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// 📌 Cart Interface (For Zustand Store)
export interface Cart {
  userId: string;
  items: CartItem[];
}

// 📌 Order Item Interface
export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// 📌 Order Interface
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "canceled";
  createdAt: string;
  updatedAt: string;
}

// 📌 Payment Interface
export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

// 📌 Review Interface
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number; // 1 to 5 stars
  comment: string;
  createdAt: string;
}

// 📌 Wishlist Interface
export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}
