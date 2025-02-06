// /routes/bookRoutes.js
const express = require("express");
const {
  getAllBooks,
  getBookById,
  searchBooks,
  checkoutBook,
  returnBook,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/wishlist", protect, addToWishlist);
router.delete("/wishlist", protect, removeFromWishlist);
router.post("/checkout/:id", protect, checkoutBook);
router.post("/return", protect, returnBook);

module.exports = router;
