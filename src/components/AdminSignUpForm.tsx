'use client';
// /src/components/AdminSignUpForm.tsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';  // Importing Next.js router for redirection

interface FormData {
  email: string;
  password: string;
  name: string;
}

const AdminSignUpForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  // Initialize router for redirection

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/auth/admin-signup', data);

      // If the response contains a redirect URL, redirect to the dashboard
      if (response.data.redirectUrl) {
        router.push(response.data.redirectUrl);  // Redirect to the dashboard
      } else {
        alert('Admin created successfully!');
      }
    } catch (err) {
      setError('Failed to create admin');
    }
  };

  return (
    <div>
      <h2>Create New Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} type="text" required />
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input {...register('password')} type="password" required />
        </div>
        <button type="submit">Create Admin</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminSignUpForm;
