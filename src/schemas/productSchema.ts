import { z } from "zod";

// MongoDB ObjectId validation regex (24 hexadecimal characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255),
  description: z.string().min(3, "Description must be at least 3 characters").max(255),
  price: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().positive("Price must be greater than 0")),
  image: z.string().url("Invalid image URL"),
  category: z
    .string()
    .regex(objectIdRegex, "Invalid category ID format")
    .optional(), // Now it's optional
  stock: z.number().int().min(0, "Stock cannot be negative"),
  rating: z
    .number()
    .min(0)
    .max(5)
    .transform((val) => Math.round(val * 10) / 10) // Rounds to 1 decimal place
    .default(0),
});
