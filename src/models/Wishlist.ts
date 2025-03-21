import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const WishlistSchema = new Schema<IWishlist>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true },
    products: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);
