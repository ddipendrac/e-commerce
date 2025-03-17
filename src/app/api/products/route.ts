import { NextApiRequest, NextApiResponse } from "next";
import { productSchema } from "@/schemas/productSchema"; // Assuming the schema is here
import { MongoClient } from "mongodb"; // You can also use Mongoose if preferred

const client = new MongoClient(process.env.MONGODB_URI as string); // MongoDB URI from .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Validate request body against the productSchema
      const validatedData = productSchema.parse(req.body); // This will throw an error if validation fails

      // Connect to MongoDB
      await client.connect();
      const db = client.db("ecommerce"); // Use your database name here
      const productsCollection = db.collection("products"); // Collection name

      // Create product object
      const newProduct = {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        image: validatedData.image,
        category: validatedData.category,
        stock: validatedData.stock,
        rating: validatedData.rating,
        createdAt: new Date(),
      };

      // Insert new product into the database
      const result = await productsCollection.insertOne(newProduct);

      // Return the created product
      return res.status(201).json({
        message: "Product created successfully",
        product: await productsCollection.findOne({ _id: result.insertedId }), // The inserted product
      });
    } catch (error) {
      console.error("Error:", error);

      // If validation failed
      if (error ) {
        return res.status(400).json({
          message: "Invalid product data",
          error: (error as Error).message,
        });
      }

      // For any other errors
      return res.status(500).json({
        message: "Failed to add product",
        error: (error as Error).message,
      });
    } finally {
      // Close the DB connection
      await client.close();
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
