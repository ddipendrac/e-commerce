import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,  // ✅ Fixing incorrect env key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // ✅ Fixing incorrect env key
  secure: true,
});

export default cloudinary;
