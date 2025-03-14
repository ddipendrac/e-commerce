import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {

  await dbConnect();

  //TODO: How to find user
  const users = await User.find({});
  if (!users) {
    return NextResponse.json({
      success: false,
      message: "Users not found"
    },
    {status: 401}
  );
  }
  return NextResponse.json(users);

  try {
 
    
  } catch (error) {
    console.error("❌ Fetch Users Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
