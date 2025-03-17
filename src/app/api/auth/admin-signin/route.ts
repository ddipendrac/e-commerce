import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json({ message: 'Please provide all fields.' }, { status: 400 });
    }

    // Find admin user
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Invalid credentials or not an admin.' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined.');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set token and role cookies
    const response = NextResponse.json({ message: 'Admin signed in successfully' });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    response.cookies.set('role', user.role, {
      httpOnly: false, // Client-side access needed
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}