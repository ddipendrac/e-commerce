"use client";

import { useAuthStore } from "@/stores/authStore";

const ProfilePage = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {!user ? (
        <p>You are not logged in.</p>
      ) : (
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
