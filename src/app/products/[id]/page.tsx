"use client"; // Ensure this is at the top

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params; // Get product id from URL

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]); // Ensure this hook runs when `id` changes

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain rounded-lg mb-6"
        />
        <p className="text-lg text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-gray-900 mb-6">${product.price}</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;