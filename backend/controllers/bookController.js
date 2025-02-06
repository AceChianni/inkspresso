// /controllers/bookController.js
const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

// Get all books from MongoDB
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Search books (local + Google Books API)
const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    let books = await Book.find({
      $or: [
        { title: new RegExp(query, "i") },
        { author: new RegExp(query, "i") },
      ],
    });

    // Fetch from Google Books API if no local results
    if (books.length === 0) {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      books = response.data.items.map((item) => ({
        googleId: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "Unknown",
        description: item.volumeInfo.description || "No description available",
        coverImage: item.volumeInfo.imageLinks?.thumbnail || "",
      }));
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get book details by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.wishlist.includes(bookId)) {
      user.wishlist.push(bookId);
      await user.save();
    }

    res.json({ message: "Book added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.json({
      message: "Book removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Checkout a book (limit: 3 books per user)
const checkoutBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("checkedOutBooks");
    const book = await Book.findById(req.params.id);

    if (!user || !book)
      return res.status(404).json({ message: "User or book not found" });
    if (user.checkedOutBooks.length >= 3)
      return res.status(400).json({ message: "Checkout limit reached" });

    user.checkedOutBooks.push(book._id);
    await user.save();

    res.json({
      message: "Book checked out",
      checkedOutBooks: user.checkedOutBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.checkedOutBooks = user.checkedOutBooks.filter(
      (id) => id.toString() !== bookId
    );
    await user.save();

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  checkoutBook,
  returnBook,
  addToWishlist,
  removeFromWishlist,
};
