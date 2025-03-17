import Wishlist from "@/models/Wishlist";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();
    const wishlist = await Wishlist.findOne({ user: params.userId }).populate("products");
    if (!wishlist) return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("❌ Get Wishlist Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
