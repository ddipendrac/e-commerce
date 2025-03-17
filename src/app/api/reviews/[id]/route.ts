import { NextRequest, NextResponse } from "next/server";
import dbConnect  from "@/utils/db";
import Review from "@/models/Review";

export async function GET(req: NextRequest, { params }: { params: { _id: string } }) {
  try {
    await dbConnect();
    const review = await Review.findById(params._id).populate("user product");
    if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error("❌ Get Review Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { _id: string } }) {
  try {
    await dbConnect();
    const deletedReview = await Review.findByIdAndDelete(params._id);
    if (!deletedReview) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Delete Review Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 
