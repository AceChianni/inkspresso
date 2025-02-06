// /routes/bookRoutes.js
import express from "express";
import {
  getAllBooks,
  getBookById,
  searchBooks,
  checkoutBook,
  returnBook,
  addToWishlist,
  removeFromWishlist
} from "../controllers/bookController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/wishlist", authenticateUser, addToWishlist);
router.delete("/wishlist", authenticateUser, removeFromWishlist);
router.post("/checkout/:id", authenticateUser, checkoutBook);
router.post("/return", authenticateUser, returnBook);

export default router;


// import express from 'express';
// import { getAllBooks, getBookById, searchBooks, checkoutBook } from '../controllers/bookController.js';
// import { authenticateUser } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', getAllBooks);
// router.get('/search', searchBooks);
// router.get('/:id', getBookById);
// router.post('/checkout/:id', authenticateUser, checkoutBook);

// export default router;
