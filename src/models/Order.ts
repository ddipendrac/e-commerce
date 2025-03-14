import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: { 
    product: mongoose.Types.ObjectId; 
    quantity: number }[];
  totalPrice: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true },
    products: [
      {
        product: { 
          type: Schema.Types.ObjectId, 
          ref: "Product", 
          required: true },
        quantity: { 
          type: Number, 
          required: true },
      },
    ],
    totalPrice: { 
      type: Number, 
      required: true },
    status: { 
      type: String, 
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], 
      default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
