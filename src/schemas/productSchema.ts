import { z } from "zod";

// MongoDB ObjectId validation regex (24 hexadecimal characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z
    .union([
      z.string().refine(val => !isNaN(Number(val)), "Price must be a number").transform(val => Number(val)),
      z.number().refine(val => !isNaN(val), "Price must be a valid number")
    ])
    .refine(price => price > 0, { message: "Price must be greater than 0" }),
  image: z.string().url("Invalid image URL"),
  category: z.string().regex(objectIdRegex, "Invalid category ID format"),  // Validate ObjectId format
  stock: z.number().min(0).nonnegative("Stock cannot be negative"),
  rating: z.number().min(0).max(5).default(0),
});
