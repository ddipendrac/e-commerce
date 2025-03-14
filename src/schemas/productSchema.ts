import { z } from "zod";


export const productSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(0).positive("Price must be a positive number"),
  image: z.string().url("Invalid image URL"),
  category: z.string().min(3, "Invalid category ID").max(255),
  stock: z.number().min(0).nonnegative("Stock cannot be negative"),
  rating: z.number().min(0).max(5).default(0)
})
