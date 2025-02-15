// /pages/api/products.js
require("dotenv").config(); // Load environment variables
console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

export default async function handler(req, res) {
  const { category, sortBy, search, minPrice, maxPrice, page, limit } =
    req.query;

  console.log("Received query parameters:", req.query); // Check incoming request

  console.log("ENV BACKEND_URL:", process.env.BACKEND_URL);
  console.log(
    "ENV NEXT_PUBLIC_BACKEND_URL:",
    process.env.NEXT_PUBLIC_BACKEND_URL
  );

  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.error("Backend URL is not defined.");
    return res.status(500).json({ message: "Backend URL is not defined" });
  }

  try {
    const queryParams = new URLSearchParams({
      category: category || "",
      sortBy: sortBy || "",
      search: search || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      page: page || "1",
      limit: limit || "10",
    }).toString();

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${queryParams}`;

    console.log("Fetching API URL:", apiUrl); // Check the URL being called

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData); // Check the response from the API
      throw new Error(errorData.message || "Failed to fetch products");
    }

    const data = await response.json();
    console.log("Fetched products:", data); // Log the data fetched

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error); // Detailed error message
    res.status(500).json({
      message: "Error connecting to backend",
      error: error.message,
    });
  }
}

// export default async function handler(req, res) {
//   const { category, sortBy, search, minPrice, maxPrice, page, limit } =
//     req.query;

//   console.log("ENV BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL); // ✅ Log to confirm

//   if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
//     return res.status(500).json({ message: "Backend URL is not defined" });
//   }

//   try {
//     // Construct query parameters safely by encoding them
//     const queryParams = new URLSearchParams({
//       category: category || "",
//       sortBy: sortBy || "",
//       search: search || "",
//       minPrice: minPrice || "",
//       maxPrice: maxPrice || "",
//       page: page || "1",
//       limit: limit || "10",
//     }).toString();

//     // Construct the API URL
//     const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${queryParams}`;

//     console.log("Fetching API URL:", apiUrl); // ✅ Debugging

//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // Handle non-2xx status codes
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("API Error:", errorData);
//       throw new Error(errorData.message || "Failed to fetch products");
//     }

//     // Parse response JSON
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       message: "Error connecting to backend",
//       error: error.message,
//     });
//   }
// }
