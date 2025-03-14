import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number
  }[];
}

const CartSchema = new Schema<ICart>(
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
          default: 0 },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.Cart  || mongoose.model<ICart>('Cart', CartSchema);