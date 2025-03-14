import NextAuth from "next-auth";
import { authOptions } from "./options";

// Create the NextAuth handler using the authentication options.
const handler = NextAuth(authOptions);

// Export the handler to handle both GET and POST requests for authentication.
// This means NextAuth will handle the authentication process for both request methods.
export { handler as GET, handler as POST };