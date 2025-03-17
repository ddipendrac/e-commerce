const API_BASE_URL = "/api"; // Adjust if your API is hosted elsewhere

// 📌 Helper function to handle API requests
const apiRequest = async (endpoint: string, method = "GET", body?: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in API call: ${endpoint}`, error);
    throw error;
  }
};

// 📌 Auth APIs
export const registerUser = (userData: any) => apiRequest("/auth/register", "POST", userData);
export const loginUser = (credentials: any) => apiRequest("/auth/login", "POST", credentials);
export const logoutUser = () => apiRequest("/auth/logout", "POST");
export const getCurrentUser = () => apiRequest("/auth/user");

// 📌 User APIs
export const getUsers = () => apiRequest("/users");
export const getUserById = (id: string) => apiRequest(`/users/${id}`);

// 📌 Product APIs
export const getProducts = () => apiRequest("/products");
export const getProductById = (id: string) => apiRequest(`/products/${id}`);
export const createProduct = (productData: any) => apiRequest("/products", "POST", productData);
export const updateProduct = (id: string, productData: any) => apiRequest(`/products/${id}`, "PUT", productData);
export const deleteProduct = (id: string) => apiRequest(`/products/${id}`, "DELETE");

// 📌 Category APIs
export const getCategories = () => apiRequest("/categories");
export const getCategoryById = (id: string) => apiRequest(`/categories/${id}`);
export const createCategory = (categoryData: any) => apiRequest("/categories", "POST", categoryData);
export const updateCategory = (id: string, categoryData: any) => apiRequest(`/categories/${id}`, "PUT", categoryData);
export const deleteCategory = (id: string) => apiRequest(`/categories/${id}`, "DELETE");

// 📌 Cart APIs
export const getCartByUserId = (userId: string) => apiRequest(`/carts/${userId}`);
export const addToCart = (userId: string, cartData: any) => apiRequest(`/carts/${userId}`, "POST", cartData);
export const removeFromCart = (userId: string, productId: string) => apiRequest(`/carts/${userId}`, "DELETE", { productId });

// 📌 Order APIs
export const getOrders = () => apiRequest("/orders");
export const getOrderById = (id: string) => apiRequest(`/orders/${id}`);
export const createOrder = (orderData: any) => apiRequest("/orders", "POST", orderData);
export const updateOrderStatus = (id: string, status: string) => apiRequest(`/orders/${id}`, "PUT", { status });
export const deleteOrder = (id: string) => apiRequest(`/orders/${id}`, "DELETE");

// 📌 Payment APIs
export const createPayment = (paymentData: any) => apiRequest("/payments", "POST", paymentData);

// 📌 Review APIs
export const getReviews = () => apiRequest("/reviews");
export const getReviewById = (id: string) => apiRequest(`/reviews/${id}`);
export const createReview = (reviewData: any) => apiRequest("/reviews", "POST", reviewData);
export const updateReview = (id: string, reviewData: any) => apiRequest(`/reviews/${id}`, "PUT", reviewData);
export const deleteReview = (id: string) => apiRequest(`/reviews/${id}`, "DELETE");

// 📌 Wishlist APIs
export const getWishlistByUserId = (userId: string) => apiRequest(`/wishlist/${userId}`);
export const addToWishlist = (userId: string, productId: string) => apiRequest(`/wishlist/${userId}`, "POST", { productId });
export const removeFromWishlist = (userId: string, productId: string) => apiRequest(`/wishlist/${userId}`, "DELETE", { productId });
