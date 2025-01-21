// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// Create a new product (Admin only)
router.post("/", protect, admin, async (req, res) => {
  // Destructure product fields from request body
  const { name, description, price, category, image } = req.body;

  try {
    // Create a new product document
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    // Save the new product to the database
    const createdProduct = await product.save();
    res.status(201).json(createdProduct); // Respond with the created product
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ message: error.message });
  }
});

// Update an existing product (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // If the product is not found, return a 404 error
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Update the product fields with provided data or keep the existing ones
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;

    // Save the updated product to the database
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct); // Respond with the updated product
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ message: error.message });
  }
});

// Delete a product (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // If the product is not found, return a 404 error
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Delete the product from the database using findByIdAndDelete
    await Product.findByIdAndDelete(req.params.id);

    // Respond with a success message
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ message: error.message });
  }
});

// Get all products (Available for everyone)
router.get("/", async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();
    res.status(200).json(products); // Respond with the list of products
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ message: error.message });
  }
});

// Get a single product by ID (Available for everyone)
router.get("/:id", async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // If the product is not found, return a 404 error
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Respond with the found product
    res.status(200).json(product);
  } catch (error) {
    // Handle errors and send an error response
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
