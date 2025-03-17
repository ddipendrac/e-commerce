"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xl font-semibold text-gray-600">Loading products...</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Product List</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-lg font-semibold text-gray-900 mb-4">${product.price}</p>
              <Link
                href={`/products/${product.id}`}
                className="inline-block text-blue-600 hover:text-blue-800 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
