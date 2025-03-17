import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: mongoose.Types.ObjectId;
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
    image: { 
      type: String, 
      required: true 
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },
    stock: { 
      type: Number, 
      default: 0 
    },
    rating: { 
      type: Number, 
      default: 0 
    },
  },
  { timestamps: true }  // This will automatically create 'createdAt' and 'updatedAt' fields
);

// Ensure you are using an existing category model for the 'ref' to work
export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
