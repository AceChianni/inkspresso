// /pages/api/products.js
export default async function handler(req, res) {
  const { category, sortBy, search, minPrice, maxPrice, page, limit } =
    req.query;

  console.log("ENV BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL); // ✅ Log to confirm

  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    return res.status(500).json({ message: "Backend URL is not defined" });
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?category=${category}&sortBy=${sortBy}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`;

    console.log("Fetching API URL:", apiUrl); // ✅ Debugging

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch products");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error connecting to backend", error: error.message });
  }
}

// export default async function handler(req, res) {
//   const { category, sortBy, search, minPrice, maxPrice, page, limit } =
//     req.query;

//   // Log environment variable to check if it's being read correctly
//   console.log("ENV BACKEND_URL:", process.env.BACKEND_URL);

//   if (!process.env.BACKEND_URL) {
//     return res.status(500).json({ message: "Backend URL is not defined" });
//   }

//   // Fix: Ensure we are calling `/api/products` instead of `/products`
//   const apiUrl = `${process.env.BACKEND_URL}/api/products?category=${
//     category || ""
//   }&sortBy=${sortBy || "createdAt:desc"}&search=${search || ""}&minPrice=${
//     minPrice || ""
//   }&maxPrice=${maxPrice || ""}&page=${page || "1"}&limit=${limit || "10"}`;

//   console.log("Fetching API URL:", apiUrl);

//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       const errorData = await response.text();
//       throw new Error(errorData);
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res
//       .status(500)
//       .json({ message: "Error connecting to backend", error: error.message });
//   }
// }
