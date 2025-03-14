import { z } from "zod";

export const reviewSchema = z.object({
  user: z.string().min(24, "Invalid user ID"),
  product: z.string().min(24, "Invalid product ID"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});
