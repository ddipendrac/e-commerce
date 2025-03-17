"use client";

import AdminMenu from '@/components/AdminMenu';
import LogoutButton from './LogoutButton';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AdminMenu />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Admin Dashboard</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
