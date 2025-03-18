import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Renamed to match Zod schema
  category?: mongoose.Types.ObjectId; // Made optional to match Zod
  stock: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    imageUrl: {  // ✅ Renamed from 'image' to 'imageUrl'
      type: String, 
      required: true 
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category", 
      required: false // ✅ Now optional, matching Zod
    },
    stock: { 
      type: Number, 
      default: 0,
      min: 0 // ✅ Prevents negative stock values
    },
    rating: { 
      type: Number, 
      default: 0,
      min: 0, // ✅ Prevents negative ratings
      max: 5  // ✅ Ensures rating stays within 0-5
    },
  },
  { timestamps: true }  // ✅ Automatically adds 'createdAt' and 'updatedAt'
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
