import { z } from "zod";

export const paymentSchema = z.object({
  user: z.string().min(24, "Invalid user ID"),
  order: z.string().min(24, "Invalid order ID"),
  paymentMethod: z.enum(["Stripe", "PayPal"]),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]).default("Pending"),
});
