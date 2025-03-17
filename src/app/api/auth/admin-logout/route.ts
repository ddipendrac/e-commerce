import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Admin logged out successfully' });

  response.cookies.set('token', '', { 
    httpOnly: true, 
    expires: new Date(0), // Expire the cookie
  });

  return response;
}
