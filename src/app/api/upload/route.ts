import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(req: Request) {
  try {
    // Use formData() to extract the file from a multipart/form-data request
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    // Convert the file (Blob) to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload the buffer to Cloudinary using their upload_stream API.
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products", resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });
    
    // Return the secure URL from Cloudinary
    return NextResponse.json({ url: (uploadResponse as any).secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
