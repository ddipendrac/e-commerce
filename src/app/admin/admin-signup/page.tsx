"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  secretCode: string;
}

const AdminSignUpPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/auth/admin-signup", data);
      if (response.status === 201) {
        router.push("/admin-signin");
      } else {
        setError(response.data.message);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error creating admin account");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" {...register("name", { required: "Name is required" })} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" {...register("email", { required: "Email is required" })} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input type="password" {...register("confirmPassword", { required: "Confirm Password is required" })} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Secret Code</label>
            <input type="text" {...register("secretCode", { required: "Secret code is required" })} 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
            {errors.secretCode && <p className="text-red-500 text-sm mt-1">{errors.secretCode.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUpPage;
