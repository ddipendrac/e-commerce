import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("❌ Logout Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
