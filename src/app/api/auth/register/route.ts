import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  dbConnect  from "@/utils/db"
import User from "@/models/User";
import { userSchema } from "@/schemas/userSchema";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
