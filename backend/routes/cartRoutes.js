// backend/routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// Get cart items for the authenticated user
router.get("/", protect, getCart);

// Add item to the cart
router.post("/", protect, addToCart);

// Update item quantity in the cart
router.put("/:itemId", protect, updateCartItem);

// Remove item from the cart
router.delete("/:itemId", protect, removeFromCart);

module.exports = router;
