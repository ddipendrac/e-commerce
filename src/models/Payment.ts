import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "NPR" },
    paymentMethod: { type: String, required: true, enum: ["esewa", "khalti", "stripe", "paypal", "cod"] },
    transactionId: { type: String, unique: true, required: true },
    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
