"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  description: string;
  price: string;
  image: FileList;
  category: string;
}

const AdminAddProductPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      if (!data.image || data.image.length === 0) {
        setError("Please select an image");
        setLoading(false);
        return;
      }

      if (!data.category) {
        setError("Please select a category");
        setLoading(false);
        return;
      }

      // Step 1: Upload Image to Cloudinary
      const file = data.image[0];
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post("/api/upload", formData);
      if (uploadResponse.status !== 200) {
        throw new Error("Image upload failed");
      }

      const imageUrl = uploadResponse.data.url;

      // Step 2: Send product data to backend
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        image: imageUrl,
        category: data.category,
      };

      const apiResponse = await axios.post("/api/products", productData);
      if (apiResponse.status === 201) {
        router.push("/admin/dashboard/products");
      } else {
        setError("Failed to add product");
      }
    } catch (err) {
      setError("Failed to upload image or add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add New Product</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              placeholder="Product Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="Price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* Image */}
          <div>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Category */}
          <div>
            <select
              {...register("category", { required: "Please select a category" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
