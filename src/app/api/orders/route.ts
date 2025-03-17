import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, products, totalAmount, paymentStatus, status } = body;

    if (!userId || !products || products.length === 0 || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      paymentStatus: paymentStatus || "pending",
      status: status || "processing",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find().populate("userId").populate("products.productId");

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
