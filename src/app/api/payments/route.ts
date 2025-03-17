import Payment from "@/models/Payment";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newPayment = new Payment(body);
    await newPayment.save();
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    console.error("❌ Payment Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
