// /pages/api/products/[id].js
import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("products");

  if (req.method === "GET") {
    const {
      category,
      sortBy,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const options = {
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    };

    try {
      const products = await collection
        .find(query)
        .sort({ [sortBy || "name"]: 1 })
        .skip(options.skip)
        .limit(options.limit)
        .toArray();
      res.status(200).json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products", error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { name, price, description, image } = req.body;
      if (!name || !price || !description) {
        return res
          .status(400)
          .json({ message: "Name, price, and description are required" });
      }

      const result = await collection.insertOne({
        name,
        price: Number(price),
        description,
        image,
      });
      res
        .status(201)
        .json({ message: "Product added", product: result.ops[0] });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding product", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import clientPromise from "./lib/mongodb";

// export default async function handler(req, res) {
//   const { category, sortBy, search, minPrice, maxPrice, page, limit } =
//     req.query;

//   try {
//     // Connect to MongoDB
//     const client = await clientPromise;
//     const db = client.db();
//     const collection = db.collection("products"); // Ensure your collection name is 'products'

//     const query = {};

//     // Build dynamic query based on query params
//     if (category) query.category = category;
//     if (search) query.name = { $regex: search, $options: "i" }; // Case-insensitive search for product name
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     const options = {
//       skip: (Number(page) - 1) * Number(limit), // Pagination
//       limit: Number(limit),
//     };

//     // Fetch products from MongoDB
//     const products = await collection
//       .find(query)
//       .sort({ [sortBy || "name"]: 1 })
//       .skip(options.skip)
//       .limit(options.limit)
//       .toArray();

//     // Return the fetched products
//     res.status(200).json({ products });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error connecting to backend or fetching products",
//       error: error.message,
//     });
//   }
// }
