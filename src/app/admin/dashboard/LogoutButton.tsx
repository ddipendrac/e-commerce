"use client";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.get('/api/auth/admin-logout'); // Updated API endpoint
    router.push('/admin-signin');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
