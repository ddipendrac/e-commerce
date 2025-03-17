import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Cart from "@/models/Cart";

// GET: Fetch the cart for a given user
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();
    const { userId } = params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// POST: Add a new item to the cart (or create a new cart if not exists)
export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();
    const { userId } = params;
    const body = await req.json();
    const { productId, quantity } = body;
    
    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Missing productId or invalid quantity" }, { status: 400 });
    }
    
    // Find the user's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Otherwise, add the new item
      cart.items.push({ productId, quantity });
    }
    
    const savedCart = await cart.save();
    return NextResponse.json(savedCart, { status: 201 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// PUT: Update an item in the cart (e.g. update its quantity)
export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();
    const { userId } = params;
    const body = await req.json();
    const { productId, quantity } = body;
    
    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Missing productId or invalid quantity" }, { status: 400 });
    }
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    
    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );
    
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Product not found in cart" }, { status: 404 });
    }
    
    // Update the quantity of the product in the cart
    cart.items[itemIndex].quantity = quantity;
    const savedCart = await cart.save();
    return NextResponse.json(savedCart, { status: 200 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// DELETE: Remove an item from the cart
export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
  try {
    await dbConnect();
    const { userId } = params;
    const body = await req.json();
    const { productId } = body;
    
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    
    cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId);
    const savedCart = await cart.save();
    return NextResponse.json(savedCart, { status: 200 });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
  }
}
