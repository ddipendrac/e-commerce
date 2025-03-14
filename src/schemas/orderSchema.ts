import { z } from "zod";

export const orderSchema = z.object({
  user: z.string().min(24, "Invalid user ID"),
  products: z.array(
    z.object({
      product: z.string().min(24, "Invalid product ID"),
      quantity: z.number().int().min(1, "Quantity must be at least 1"),
    })
  ),
  totalPrice: z.number().positive("Total price must be positive"),
  status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]).default("Pending"),
});
