import { MenuBar } from "@/components/MenuBar";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Your E-Commerce Website',
  description: 'Shop the best products with great deals.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-20">
      <MenuBar />
      {/* Main Content */}
      <main className="flex flex-col gap-16 items-center sm:items-start">
        {/* E-commerce Header with Logo and Branding */}
        <div className="flex flex-col items-center">
          <Image
            src="/your-logo.svg" // Replace with your custom logo
            alt="E-Commerce Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-3xl font-bold mt-4 text-center sm:text-left">
            Welcome to the Best Online Store
          </h1>
          <p className="text-lg text-gray-700 text-center sm:text-left">
            Browse our wide selection of products with amazing deals!
          </p>
        </div>

        {/* Featured Products Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {/* Product 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              src="/product-1.jpg" // Replace with your product image
              alt="Product 1"  
              width={300}
              height={200}
              className="w-full h-auto object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">Product 1</h2>
            <p className="text-gray-600 mt-2">$25.99</p>
            <Link href="/products/1" className="text-blue-600 mt-4 inline-block">View Details</Link>
          </div>

          {/* Product 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              src="/product-2.jpg" // Replace with your product image
              alt="Product 2"
              width={300}
              height={200}
              className="w-full h-auto object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">Product 2</h2>
            <p className="text-gray-600 mt-2">$39.99</p>
            <Link href="/products/2" className="text-blue-600 mt-4 inline-block">View Details</Link>
          </div>

          {/* Product 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              src="/product-3.jpg" // Replace with your product image
              alt="Product 3"
              width={300}
              height={200}
              className="w-full h-auto object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">Product 3</h2>
            <p className="text-gray-600 mt-2">$49.99</p>
            <Link href="/products/3" className="text-blue-600 mt-4 inline-block">View Details</Link>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="flex gap-4 items-center justify-center mt-12">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors bg-blue-600 text-white py-2 px-6 hover:bg-blue-700"
            href="/shop"
          >
            Start Shopping
          </Link>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors bg-gray-600 text-white py-2 px-6 hover:bg-gray-700"
            href="/sales"
          >
            Check Our Sales
          </Link>
        </div>
      </main>

      {/* Footer with Custom Links */}
      <footer className="flex gap-8 justify-center mt-16 py-6 border-t border-gray-200">
        <Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
        <Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link>
      </footer>
    </div>
  );
}
