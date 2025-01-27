// /pages/api/products.js

export default async function handler(req, res) {
  const { category, sortBy, search, minPrice, maxPrice, page, limit } = req.query;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/products?category=${category}&sortBy=${sortBy}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`);
    
    // Check if the response is OK and is returning JSON
    if (!response.ok) {
      const errorData = await response.text(); // Get the text response to check for errors
      throw new Error(errorData);
    }

    const data = await response.json();

    // Return JSON data
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error connecting to backend", error: error.message });
  }
}

