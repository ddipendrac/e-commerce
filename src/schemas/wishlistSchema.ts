import { z } from "zod";

export const wishlistSchema = z.object({
  user: z.string().min(24, "Invalid user ID"),
  products: z.array(z.string().min(24, "Invalid product ID")),
});
