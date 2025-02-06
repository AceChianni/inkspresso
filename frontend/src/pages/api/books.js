// /pages/api/books.js

export default async function handler(req, res) {
    try {
      const { q } = req.query; // Get search query
      if (!q) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
  
      // Fetch data from Google Books API
      const googleRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=10`
      );
      const googleData = await googleRes.json();
  
      // Extract relevant details
      const books = googleData.items?.map((book) => ({
        id: book.id,
        title: book.volumeInfo.title || "No Title",
        author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
        description: book.volumeInfo.description || "No Description",
        cover: book.volumeInfo.imageLinks?.thumbnail || "/default-cover.jpg",
      })) || [];
  
      return res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  