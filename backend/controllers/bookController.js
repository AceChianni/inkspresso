// /controllers/bookController.js
import axios from "axios";
import Book from "../models/Book.js";
import User from "../models/User.js";

// Get all books from MongoDB
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Search books (local + Google Books API)
export const searchBooks = async (req, res) => {
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
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
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
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.json({ message: "Book removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Checkout a book (limit: 3 books per user)
export const checkoutBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("checkedOutBooks");
    const book = await Book.findById(req.params.id);

    if (!user || !book) return res.status(404).json({ message: "User or book not found" });
    if (user.checkedOutBooks.length >= 3) return res.status(400).json({ message: "Checkout limit reached" });

    user.checkedOutBooks.push(book._id);
    await user.save();

    res.json({ message: "Book checked out", checkedOutBooks: user.checkedOutBooks });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.checkedOutBooks = user.checkedOutBooks.filter((id) => id.toString() !== bookId);
    await user.save();

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// import Book from '../models/Book.js';

// // Get all books
// export const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Search books by title or author
// export const searchBooks = async (req, res) => {
//   try {
//     const { query } = req.query;
//     const books = await Book.find({
//       $or: [
//         { title: new RegExp(query, 'i') },
//         { author: new RegExp(query, 'i') }
//       ]
//     });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Get book details by ID
// export const getBookById = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: 'Book not found' });
//     res.json(book);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Checkout a book
// export const checkoutBook = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book || book.availableCopies <= 0)
//       return res.status(400).json({ message: 'Book not available' });

//     book.availableCopies -= 1;
//     await book.save();
//     res.json({ message: 'Book checked out successfully', book });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
