import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    // TODO: provide id
    const users = await User.findById({})
    return NextResponse.json(users);
  } catch (error) {
    console.error("❌ Fetch Users Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
