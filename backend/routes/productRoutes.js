// routes/productRoutes.js

const express = require("express");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const { protect, admin } = require("../middleware/authMiddleware");
const { deleteProduct } = require("../controllers/productController");
const Product = require("../models/Product");

const router = express.Router();
const upload = multer({ storage });

// Admin: Create a new product with image upload
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  const { name, description, price, category } = req.body;
  console.log("Request Body:", req.body);
  console.log("Uploaded file:", req.file);
  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      image: req.file?.path,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Update an existing product with image upload
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  const { name, description, price, category } = req.body;

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
    product.image = req.file?.path || product.image;

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

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products with filtering, sorting, search, and pagination
router.get("/", async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    // Ensure limit is within bounds (10 to 20)
    const pageLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 10), 20);

    // Build the filter object
    const filter = {};
    if (category) {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Determine sorting
    const sortOptions = {};
    if (sortBy) {
      const [key, order] = sortBy.split(":");
      sortOptions[key] = order === "desc" ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default: sort by latest
    }

    // Pagination logic
    const skip = (parseInt(page, 10) - 1) * pageLimit;

    // Fetch products with filters, sorting, and pagination
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageLimit);

    // Total count for pagination metadata
    const total = await Product.countDocuments(filter);

    // Response with data and pagination metadata
    res.status(200).json({
      products,
      pagination: {
        totalItems: total,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(total / pageLimit),
        hasNextPage: page * pageLimit < total,
        hasPrevPage: page > 1,
      },
    });
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
