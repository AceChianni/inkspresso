// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// Create a new product (Admin only)
router.post("/", protect, admin, async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing product (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Use findByIdAndDelete for deleting the product
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products (Available for everyone)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single product by ID (Available for everyone)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
