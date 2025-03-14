import { z } from "zod";

export const cartSchema = z.object({
  user: z.string().min(24, "Invalid user ID"),
  products: z.array(
    z.object({
      product: z.string().min(24, "Invalid product ID"),
      quantity: z.number().int().min(1, "Quantity must be at least 1"),
    })
  ),
});
