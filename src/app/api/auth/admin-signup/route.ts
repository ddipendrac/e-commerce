import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/db";
import User from "@/models/User";

const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE;
const ADMIN_ALLOWED_EMAILS = process.env.ADMIN_ALLOWED_EMAILS?.split(",") || [];

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password, name, secretCode } = await req.json();

    // ✅ Check if the email is in the allowed list
    if (!ADMIN_ALLOWED_EMAILS.includes(email)) {
      return NextResponse.json({ message: "Unauthorized admin email" }, { status: 403 });
    }

    // ✅ Verify the secret code
    if (secretCode !== ADMIN_SECRET_CODE) {
      return NextResponse.json({ message: "Invalid secret code" }, { status: 403 });
    }

    // ✅ Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create new admin user
    const newAdmin = new User({
      email,
      password: hashedPassword,
      name,
      role: "admin",
    });

    await newAdmin.save();

    return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Admin Sign Up Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}