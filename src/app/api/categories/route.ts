import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Category from "@/models/Category";

// GET: Fetch all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).lean();  // Using lean() to return plain objects
    const categoriesWithStringId = categories.map((category: { _id: any }) => ({
      ...category,
      _id: category._id.toString(),  // Convert ObjectId to string for easier use
    }));
    return NextResponse.json(categoriesWithStringId, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name } = body;

    // Input validation
    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    // Sanitize input (trim spaces and ensure lowercase consistency)
    const sanitizedCategoryName = name.trim().toLowerCase();

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name: sanitizedCategoryName });
    if (existingCategory) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    // Create new category
    const newCategory = await Category.create({ name: sanitizedCategoryName });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
