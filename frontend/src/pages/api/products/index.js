// /pages/api/products/index.js
import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("products");

  if (req.method === "GET") {
    try {
      const products = await collection.find({}).toArray();
      res.status(200).json({ products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import clientPromise from "../lib/mongodb";

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   const db = client.db();
//   const collection = db.collection("products");

//   if (req.method === "GET") {
//     try {
//       const products = await collection.find({}).toArray();
//       res.status(200).json(products);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error fetching products", error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
