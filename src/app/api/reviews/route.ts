import Review from "@/models/Review";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newReview = new Review(body);
    await newReview.save();
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("❌ Create Review Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
