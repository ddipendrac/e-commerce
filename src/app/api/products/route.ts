import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/models/Product";
import { z } from "zod";

// MongoDB ObjectId validation regex
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string().regex(objectIdRegex, "Invalid category ID format"),
  stock: z.number().int().nonnegative(),
  imageUrl: z.string().url(),
});

export async function POST(req: Request) {
  try {
    await dbConnect();
  } catch (error) {
    return NextResponse.json({ success: false, error: "Database connection failed" }, { status: 500 });
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid JSON format" }, { status: 400 });
  }

  try {
    const validatedData = productSchema.parse(body);
    const newProduct = await Product.create(validatedData);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }

    if ((error as any).name === "ValidationError") {
      return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
  } catch (error) {
    return NextResponse.json({ success: false, error: "Database connection failed" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products, page, limit });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}
