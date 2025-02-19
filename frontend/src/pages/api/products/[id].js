// /pages/api/products/[id].js
import { ObjectId } from "mongodb";
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
      const { name, price, description, image, category } = req.body;
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
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res
        .status(201)
        .json({ message: "Product added", product: result.ops[0] });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding product", error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      // Ensure request body is properly parsed
      const { name, price, description, image, category } = req.body;

      if (!name || !price || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const updatedProduct = {
        name,
        price: Number(price),
        description,
        image,
        category,
        updatedAt: new Date(),
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedProduct }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// /pages/api/products/[id].js
// import { ObjectId } from "mongodb";
// import clientPromise from "../lib/mongodb";

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   const db = client.db();
//   const collection = db.collection("products");

//   if (req.method === "GET") {
//     const {
//       category,
//       sortBy,
//       search,
//       minPrice,
//       maxPrice,
//       page = 1,
//       limit = 10,
//     } = req.query;
//     const query = {};

//     if (category) query.category = category;
//     if (search) query.name = { $regex: search, $options: "i" };
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     const options = {
//       skip: (Number(page) - 1) * Number(limit),
//       limit: Number(limit),
//     };

//     try {
//       const products = await collection
//         .find(query)
//         .sort({ [sortBy || "name"]: 1 })
//         .skip(options.skip)
//         .limit(options.limit)
//         .toArray();
//       res.status(200).json(products);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error fetching products", error: error.message });
//     }
//   } else if (req.method === "POST") {
//     try {
//       const { name, price, description, image, category } = req.body;
//       if (!name || !price || !description) {
//         return res
//           .status(400)
//           .json({ message: "Name, price, and description are required" });
//       }

//       const result = await collection.insertOne({
//         name,
//         price: Number(price),
//         description,
//         image,
//         category,
//       });
//       res
//         .status(201)
//         .json({ message: "Product added", product: result.ops[0] });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error adding product", error: error.message });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { id } = req.query;
//       const { name, price, description, image, category } = req.body;
//       if (!ObjectId.isValid(id)) {
//         return res.status(400).json({ message: "Invalid product ID" });
//       }

//       const updatedProduct = {
//         name,
//         price: Number(price),
//         description,
//         image,
//         category,
//       };

//       const result = await collection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: updatedProduct }
//       );

//       if (result.matchedCount === 0) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.status(200).json({ message: "Product updated" });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error updating product", error: error.message });
//     }
//   } else if (req.method === "DELETE") {
//     try {
//       const { id } = req.query;
//       if (!ObjectId.isValid(id)) {
//         return res.status(400).json({ message: "Invalid product ID" });
//       }
//       const result = await collection.deleteOne({ _id: new ObjectId(id) });
//       if (result.deletedCount === 0) {
//         return res.status(404).json({ message: "Product not found" });
//       }
//       res.status(200).json({ message: "Product deleted" });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error deleting product", error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
