// /src/pages/library/index.js

import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      return;
    }

    const delay = setTimeout(() => {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=21`
      )
        .then((res) => res.json())
        .then((data) => setBooks(data.items || []));
    }, 450); // delay typing = smoother UI

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-base-100 text-neutral">
      <h1 className="text-4xl font-heading tracking-tight mb-8 text-center text-primary-focus">
        Library
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex w-full max-w-md bg-base-200 border border-base-300 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 ring-primary/40 transition">
          <input
            type="text"
            placeholder="Search books, authors, genres..."
            className="px-4 py-3 w-full bg-transparent text-neutral focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-5 bg-primary text-base-100 hover:bg-primary-focus transition">
            🔍
          </button>
        </div>
      </div>

      {/* Book Results */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.length === 0 ? (
          <p className="text-center text-neutral/70 col-span-full">
            Start typing to explore ✨
          </p>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
}
